import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { router } from './API/router';
import {
  getRoom, setRoom, updateRoom, addNewUser, deleteUser, clearVotingObj, deleteRoom,
} from './API/mongoDB';
import { room } from './utils/constants';
import { Room } from './types/types';
import { deleteUserFromRoom } from './utils/services';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use('/api', router);

io.on('connection', (socket) => {
  socket.on('createRoom', async ({ data }) => {
    const roomId = uuidv4();
    socket.join(roomId);
    const user = { ...data, id: socket.id, role: 'admin' };
    const newUserRoom = {
      ...room,
      roomId,
      admin: data,
      users: [user],
    };
    await setRoom(newUserRoom);
    socket.emit('returnRoomId', { id: roomId, user });
  });

  socket.on('enterRoom', ({ user, roomId }) => {
    socket.join(roomId);
    addNewUser(roomId, user);
    socket.broadcast.to(roomId).emit('enteredRoom', { user });
  });

  socket.on('getMessage', async ({ roomId, user, mess }) => {
    const searchingRoom = await getRoom(roomId);
    searchingRoom.messages.push({ name: user, message: mess });
    await updateRoom(searchingRoom);
    socket.broadcast.to(roomId).emit('sendMessage', { name: user, message: mess });
  });

  socket.on('someOneWriteMessage', ({ user, write, roomId }) => {
    io.to(roomId).emit('sendMessageWriter', { name: user, active: write });
  });

  socket.on('changeIssuesList', async ({
    newIssue, mode, roomId, oldIssue = '',
  }) => {
    const response = await getRoom(roomId);
    if (mode === 'add') {
      response.issues.push(newIssue);
    } else if (mode === 'all') {
      response.issues = newIssue;
    } else {
      const index = response.issues.findIndex((el) => el === oldIssue);
      response.issues[index] = newIssue;
    }
    updateRoom(response);
    socket.broadcast.to(roomId).emit('getIssuesList', { issues: response.issues });
  });

  socket.on('setTimeOnTimer', ({ time, roomId }) => {
    io.in(roomId).emit('sendTimeOnTimer', time);
  });

  socket.on('deleteUserWithVoting', async ({ userId, userName, roomId }) => {
    const response = await getRoom(roomId);
    const usersAmountWithAdmin = 4;
    if (response.users.length <= usersAmountWithAdmin) {
      socket.emit('cancelVoting');
      return;
    }
    const votingData = response.voting;
    votingData.id = userId;
    votingData.voices++;
    votingData.votedUsers++;
    socket.broadcast.to(roomId).emit('showCandidateToBeDeleted', { name: userName });
    updateRoom(response);
  });

  socket.on('toVoteFor', async ({ voice, user, roomId }) => {
    const response = await getRoom(roomId);
    const usersArray = response.users;
    const votingObj = response.voting;
    const usersAmount = usersArray.length - 1; // minus admin;
    if (voice === 'for') {
      votingObj.voices++;
    }
    votingObj.votedUsers++;
    if (usersAmount !== votingObj.votedUsers) {
      updateRoom(response);
      return;
    }

    if (votingObj.voices > votingObj.votedUsers / 2) {
      io.sockets.sockets.forEach((el) => {
        if (el.id === votingObj.id) {
          const resultUsersArray = usersArray.filter((elem) => elem.id !== el.id);
          clearVotingObj(roomId, el.id);
          deleteUserFromRoom(el, roomId, user, resultUsersArray);
        }
      });
    } else {
      clearVotingObj(roomId);
    }
  });

  socket.on('leaveRoom', async ({ roomId, user, id }) => {
    await deleteUser(roomId, id);
    const response = await getRoom(roomId);
    deleteUserFromRoom(socket, roomId, user, response.users);
  });

  socket.once('disconnectAll', async ({ roomId }) => {
    io.in(roomId).emit('disconnectAllSockets');
    io.in(roomId).disconnectSockets();
  });

  socket.on('disconnectOne', async ({ userId, roomId }) => {
    await deleteUser(roomId, userId);
    const response = await getRoom(roomId);
    io.sockets.sockets.forEach((el) => {
      if (el.id === userId) {
        deleteUserFromRoom(el, roomId, userId, response.users);
      }
    });
  });

  socket.on('disconnecting', () => {
    const userData = Array.from(socket.rooms);
    if (userData.length <= 1) return;
    const allRoomsId = [...userData];
    allRoomsId.shift();
    allRoomsId.forEach(async (el) => {
      await deleteUser(el, userData[0]);
      const response = await getRoom(el);
      if (response.admin.id === userData[0]) {
        io.in(el).emit('disconnectAllSockets');
        io.in(el).disconnectSockets();
        await deleteRoom(el);
      } else {
        deleteUserFromRoom(socket, el, userData[0], response.users);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });

  console.log('socket connected', socket.id);
});

const start = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB__URI
      || 'mongodb+srv://RSSchool-React:planning-poker@poker.jgasx.mongodb.net/Planning-poker-db?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    httpServer.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
