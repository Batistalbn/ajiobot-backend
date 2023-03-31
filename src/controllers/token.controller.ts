import { Response } from "express";
import axios from "axios";

require("dotenv").config();

export default class TokenController {
  getToken = async () => {
    let dataToken: string;

    await axios
      .get(`http://partner.gupshup.io/partner/app/${process.env.APPID}/token`, {
        params: {
          token: process.env.TOKEN_GUPSHUP,
        },
      })
      .then(function (response) {
        dataToken = response.data.token.token;
      });
    
		return dataToken
  };

  get = async (_, res: Response) => {
    try {
			const token = await this.getToken()

      return res.status(200).json({ token: token });
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };
}
