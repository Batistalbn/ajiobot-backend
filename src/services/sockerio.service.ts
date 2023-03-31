import { Socket } from "socket.io";

import ChatRepository from "../repositories/Chat";

export default (io: Socket) => {
  io.on("connection", async (socket: Socket) => {
    // Emitir a lista de bate-papos que ainda não foram ativados.
    const chatRepository = new ChatRepository();
    const chats = await chatRepository.getChatsNotActivated();

    socket.on("getChatActive", async (tokenDecode) => {
      if (tokenDecode.type === "attendant") {
        console.log(await chatRepository.getChatsByAttendant(tokenDecode.id));
        socket.emit(
          "chatActive",
          await chatRepository.getChatsByAttendant(tokenDecode.id)
        );
      }
    });

    socket.on("getChatSelec", async (chatSelect) => {
      if (chatSelect) {
        socket.emit(
          "chatSelect",
          await chatRepository.getChatsById(chatSelect.id)
        );
      }
    });
  });
};
