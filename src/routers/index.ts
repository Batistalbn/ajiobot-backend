import { Express } from "express";
import express from "express";

import TemplateRouter from "./template.router";
import MessageRouter from "./message.router";
import GupshupRouter from "./gupshup.router";
import WalletRouter from "./wallet.router";
import TokenRouter from "./token.router";
import UserRouter from "./user.router";
import ChatRouter from "./chat.router";
import CustumerRouter from "./custumer.router";
import SectorRouter from "./sector.router";

export default (app: Express) => {
  const templateRouter = TemplateRouter();
  const chatRouter = ChatRouter();
  const custumerRouter = CustumerRouter();
  const messageRouter = MessageRouter();
  const gupshupRouter = GupshupRouter();
  const walletRouter = WalletRouter();
  const tokenRouter = TokenRouter();
  const userRouter = UserRouter();
  const sectorRouter = SectorRouter();

	app.use("/api", custumerRouter);
  app.use("/api", chatRouter);
  app.use("/api", userRouter);
  app.use("/api", tokenRouter);
  app.use("/api", walletRouter);
  app.use("/api", messageRouter);
  app.use("/api", gupshupRouter);
  app.use("/api", templateRouter);
  app.use("/api", sectorRouter);
	app.use("/api/files", express.static("./src/uploads"));
};
