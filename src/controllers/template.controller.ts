import { Request, Response } from "express";
import axios from "axios";
import qs from "qs";

import TokenController from "./token.controller";

interface ISendTemplate {
  source: string;
  destination: string;
  template: string;
  srcName: string;
}

export default class TemplateController {
  getAuthentication = async () => {
    try {
      const token = await new TokenController().getToken();
      return token;
    } catch (e) {
      return "Acesso não autorizado";
    }
  };

  myTemplates = async () => {
    try {
      let templates: any;
      const authenticationToken = await this.getAuthentication();

      await axios
        .get(
          `https://partner.gupshup.io/partner/app/${process.env.APPID}/templates`,
          {
            params: {
              token: authenticationToken,
            },
          }
        )
        .then((res) => (templates = res.data.templates));

      return templates;
    } catch (e) {
      return "Acesso não autorizado";
    }
  };

  createTemplate = async (req: Request, res: Response) => {
    try {
      const authenticationToken = await this.getAuthentication();
      const newData = JSON.parse(JSON.stringify(req.body));
      const data = qs.stringify(newData);
      let response;

      await axios
        .post(
          `https://partner.gupshup.io/partner/app/${process.env.APPID}/templates`,
          data,
          {
            headers: {
              token: authenticationToken,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          response = res.data;
        })
        .catch((e) => {
          const status = e.response.request.res.statusCode;
          const message = e.response.data.message;
          return res.status(status).json({ error: message });
        });
      return res.status(200).json(await response);
    } catch (e) {
      return res.status(401).json({ error: "Acesso não autorizado" });
    }
  };

  getAllTemplates = async (_, res: Response) => {
    try {
      const allTemplates = await this.myTemplates();

      return res.status(200).json(allTemplates);
    } catch (e) {
      return res.status(401).json({ error: "Acesso não autorizado" });
    }
  };

  getTemplateByName = async (req: Request, res: Response) => {
    try {
      const allTemplates = await this.myTemplates();
      const findTemplate = allTemplates.find(
        (item) => item.elementName === req.params.templateName
      );

      if (!findTemplate) {
        return res.status(404).json({ error: "Template não encontrado" });
      }

      return res.status(200).json(findTemplate);
    } catch (e) {
      return res.status(400).json({ error: "error" });
    }
  };

  deleteTemplate = async (req: Request, res: Response) => {
    try {
      const authenticationToken = await this.getAuthentication();

      let response;
      const elementName = req.params;

      await axios
        .delete(
          `https://partner.gupshup.io/partner/app/${process.env.APPID}/template/${elementName}`,
          {
            headers: {
              token: authenticationToken,
            },
          }
        )
        .then((res) => {
          response = res.data;
        })
        .catch((e) => {
          const status = e.response.request.res.statusCode;
          const message = e.response.data.message;
          return res.status(status).json({ error: message });
        });

      return res.status(200).json(await response);
    } catch (error) {
      return res.status(401).json({ error: "Token não autorizado" });
    }
  };

  sendTemplateToCustomer = async ({
    source,
    destination,
    template,
    srcName,
  }: ISendTemplate) => {
    try {
      const body = {
        source: source,
        destination: destination,
        template: template,
        srcName: srcName,
      };
      const data = qs.stringify(body);

      let result;

      await axios
        .post("http://api.gupshup.io/sm/api/v1/template/msg", data, {
          headers: {
            apikey: process.env.API_KEY,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          result = res.data;
        })
        .catch((e) => {
          const status = e.response.request.res.statusCode;
          const message = e.response.data;
          result = { status: status, message: message };
        });

      return await result;
    } catch (e) {
      return { error: e };
    }
  };
}

/*__________________________________________________________________________________________ */
/* ENVIAR MENSAGEM */

/**
const data = qs.stringify(req.body);
axios
	.post("https://api.gupshup.io/sm/api/v1/msg", data, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			apikey: process.env.API_KEY,
		},
	})
	.then((response) => {
		console.log(JSON.stringify(response.data));
	})
	.catch((error) => {
		console.log(error);
		return res.status(400).json(error);
	});
*/
