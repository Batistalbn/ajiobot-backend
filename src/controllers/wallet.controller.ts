import { Request, Response } from "express";
import axios from "axios";

import TokenController from "./token.controller";

require("dotenv").config();

export default class WalletController {
  getWalletBalance = async (_: Request, res: Response) => {
    try {
      let walletBalance: string;
      const authenticationToken = await new TokenController().getToken();

      await axios
        .get(
          `http://partner.gupshup.io/partner/app/${process.env.APPID}/wallet/balance`,
          {
            params: {
              token: authenticationToken,
            },
          }
        )
        .then(function (response) {
          walletBalance = response.data.walletResponse.currentBalance;
        });

      return res.status(200).json({ currentBalance: walletBalance });
    } catch (e) {
      return res.status(401).json({ error: "Acesso não autorizado" });
    }
  };
}
