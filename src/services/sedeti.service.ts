import axios from 'axios';
import { Response } from 'express';
import {IResBoryMessage} from '../repositories/Message/interfaces'
import qs from "qs";
import { ErrorHandler } from './errors.service';
import CustumerRepository from '../repositories/Custumer';
import ChatRepository from '../repositories/Chat';


const useChatRepository = new ChatRepository();

const startSedeti = async (bodyResponde:IResBoryMessage) => {
  console.log(bodyResponde)
  if (bodyResponde.type === "message") {
    const text = bodyResponde.payload.payload.text.toUpperCase();
    const sender = bodyResponde.payload.sender;
    let body, data, result, chat;

    let custumer = await new CustumerRepository().getCustumersByPhone(
      bodyResponde.payload.sender.phone
    );

    if(!custumer){
      custumer = await new CustumerRepository().createCustumer({
        phone: sender.phone,
        name: sender.name,
      })
    }

    const isChat = custumer && (await new ChatRepository().isChatcustumer(custumer));
    
    if(!isChat){
      chat =  await new ChatRepository().createChat({
        custumer: custumer,
        custumerPhone: custumer.phone,
      });
    }else {
      chat = await new ChatRepository().getChatsByCustumer(custumer)
      console.log(chat)
    }


    switch(true){ 
        //sedetiop1
      case (text == '1' && chat.stage === 0) || text.includes("PORTAL DO EMPREGO"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "9a25089d-1d52-4fb8-8dda-cde36129cc65", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});
        chat.stage = 1;
        await useChatRepository.putChatStage(chat.id, chat);

        break;
        
        //sedetiop.1.1
      case (text == '1' && chat.stage === 1 ) || text.includes("SOU CANDIDATO"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "c7d16240-a8fe-4407-adbf-6c8700937e85", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 11;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop.1.1.1
      case (text == '1' && chat.stage === 11) || text.includes("VISUALIZAR") || text.includes("INSCREVER NAS VAGAS"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "d137a7b1-36d5-422c-8a63-1bd44077f0a5", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;
         
        //sedetiop.1.1.2
      case (text == '2' && chat.stage === 11) || text.includes("ATENDIMENTO PRESENCIAL"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "c33281da-175c-455f-8bf9-c5cfd20d908c", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;
         
        //sedetiop.1.2
      case (text == '2' && chat.stage === 1) || text.includes("SOU EMPRESA"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "8ba710c5-b0ad-449b-8a38-86727a568ab6", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);
        break;
         
        //sedetiop.1.3
      case (text == '3' && chat.stage === 1) || text.includes("CURSOS PROFISSIONALIZANTES") || text.includes("PALESTRA"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "c58c86b2-1623-4e15-9aeb-413bc3f798ca", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;
         
        //sedetiop.1.4
      case (text == '4' && chat.stage === 1) || text.includes("O QUE E PORTAL DO EMPREGO?") || text.includes("O QUE É PORTAL DO EMPREGO?") || text.includes("O QUE E PORTAL DO EMPREGO") || text.includes("O QUE É PORTAL DO EMPREGO"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "13863a1c-aca5-4afc-8f01-42093acc691d", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;
         
        //sedetiop2
      case (text == '2' && chat.stage === 0)|| text.includes("PORTAL DO EMPREGADOR") || text.includes("SEBRAE"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "e603aa3f-7e89-4208-9c51-de160262e856", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 3;
        await useChatRepository.putChatStage(chat.id, chat);

        break;
         
        //sedetiop2.1 - ABERTURA DE MEI
      case (text == '1' && chat.stage === 3) || text.includes("ABERTURA DE MEI"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "b133b311-0461-428d-95dc-9f2bf7496bdf", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 31;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.2/3.3 - ALTERAÇÃO DE MEI - BAIXA DE MEI **SÃO IGUAIS** 
      case (text == '2' && chat.stage === 3) || text.includes("ALTERAÇÃO DE MEI") || text.includes("ALTERACAO DE MEI"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "dc99c3d4-6035-48db-abf9-51921603a74e", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 32;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.2/3.3 - ALTERAÇÃO DE MEI - BAIXA DE MEI **SÃO IGUAIS**
      case (text == '3' && chat.stage === 3)|| text.includes("BAIXA DE MEI"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "dc99c3d4-6035-48db-abf9-51921603a74e", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 33;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.4 - PAGAR BOLETO DAS-MEI
      case (text == '4' && chat.stage === 3) || text.includes("PAGAR BOLETO DAS-MEI") || text.includes("PAGAR BOLETO DAS MEI"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "b4b69ffc-bb28-427b-8c7f-a34f0db9d18c", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 34;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.5 - DECLARAÇÃO ANUAL FATURAMENTO DO MEI
      case (text == '5' && chat.stage === 3) || text.includes("DECLARAÇÃO")|| text.includes("DECLARAÇÃO ANUAL FATURAMENTO DO MEI"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "dcdb3e1c-2bea-4238-83ac-055a76d8ba7b", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 35;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.6 - QUAIS ATIVIDADES POSSO EXERCER COMO MEI
      case (text == '6' && chat.stage === 3) || text.includes("QUAIS ATIVIDADES POSSO EXERCER COMO MEI"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "709b02e3-a726-49a7-93d0-e2da24a17ece", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 36;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.7 - OQUE PODE ME IMPEDIR DE ABRIR MEI
      case (text == '7' && chat.stage === 3) || text.includes("OQUE PODE ME IMPEDIR DE ABRIR UM MEI?"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "c5eb3aa4-83e4-4230-9336-b97552721938", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 37;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.8 - PROCURO CURSOS DO SEBRAE
      case (text == '8' && chat.stage === 3)  || text.includes("PROCURO CURSOS DO SEBRAE") || text.includes("CURSOS DO SEBRAE"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "1c48c759-fb35-484b-8704-ec13cee1a739", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 38;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.9 - NOTA FISCAL
      case (text == '9' && chat.stage === 3)  || text.includes("NOTA FISCAL"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "469ad450-6c8a-4a60-9e53-c3bb72031eae", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 39;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.9.1 - JA SOU MEI COM CERTIFICADO DIGITAL
      case (text == '1' && chat.stage === 39)  || text.includes("JA SOU MEI"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "64647724-5416-4f57-889a-bdd49839fe64", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.9.2 - NÃO TENHO CERTIFICADO DIGITAL, QUERO ME CERTIFICAR
      case (text == '2' && chat.stage === 39) || text.includes("NÃO TENHO CERTIFICADO DIGITAL") || text.includes("QUERO ME CERTIFICAR"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "02694e48-351c-4a87-83e0-eae70d712274", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 392;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.9.2.1 - SOU MEI PRESTADOR DE SERVIÇOS
      case (text == '1' && chat.stage === 392)  || text.includes("SOU MEI PRESTADOR DE SERVIÇOS") || text.includes("SOU MEI PRESTADOR DE SERVICOS"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "589f36ef-6870-47fc-a033-e25deed02646", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.9.2.2 - SOU MEI COMERCIANTE OU FABRICANTE
      case (text == '2' && chat.stage === 392)  || text.includes("SOU MEI COMERCIANTE OU FABRICANTE") || text.includes("SOU MEI COMERCIANTE") || text.includes("SOU MEI FABRICANTE"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "9ffed899-f527-485f-bf5c-589d45a23cfc", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
        .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
          headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.9.2.3 - PRECISO DE AJUDA NA EMISSÃO DE NOTA FISCAL DE PRESTAÇÃO DE SERVIÇO
      case (text == '3' && chat.stage === 392)  || text.includes("AJUDA NA EMISSÃO DE NOTA FISCAL DE PRESTAÇÃO DE SERVIÇO"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "9dd5951b-84e5-4269-ab56-0670a93e91ed", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.9.2.4 - PRECISO DE AJUDA NA EMISSÃO DE NOTA FISCAL DE PRODUTO
        case (text == '4' && chat.stage === 392) || text.includes("AJUDA NA EMISSÃO DE NOTA FISCAL DE PRODUTO"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "a389bda9-65bc-408c-9d93-8abc804469c2", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //sedetiop2.10 - QUERO CONVERSAR COM UM CONSULTOR
      case (text == '10' && chat.stage === 3) || text.includes("QUERO CONVERSAR COM UM CONSULTOR") || text.includes("FALAR COM ATENDENTE"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "7b4270bd-5738-4a8b-9992-d11ed628f6cd", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;
     
        //sedetiop2.11 - QUERO CONTRATAR UM FUNCIONARIO
      case (text == '11' && chat.stage === 3) || text.includes("QUERO CONTRATAR UM FUNCIONARIO"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "fffb9a49-b1b2-4eb1-9a3b-fdbb4bdcd397", "params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 99;
        await useChatRepository.putChatStage(chat.id, chat);

        break;
       //MENU PRINCIPAL     
      case text == '0' || text.includes("MENU") || text.includes("BOM DIA") || text.includes("BOA NOITE") || text.includes("BOA TARDE") || text.includes("OI") || text.includes("OLA") || text.includes("PODE ME AJUDAR"): 
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "86d5a4fa-75a4-45f8-a386-cf4a846a62c4","params": ["${sender.name}"]}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
      .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,{
           headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,"Content-Type": "application/x-www-form-urlencoded",
            },})
        .then((res) => {console.log(res.data);result = res.data;})
        .catch((e) => {console.log(e)});

        chat.stage = 0;
        await useChatRepository.putChatStage(chat.id, chat);

        break;

        //QUALQUER OUTRA MENSAGEM.
      default:
        body = {
          source: "551142277662",
          destination: sender.phone,
          template: `{"id": "1d5a9ed2-cb66-4e1d-bb7d-823e2a11537a","params": []}`,
          "src.name": "BOTsedete",
        };
        data = qs.stringify(body);
      await axios
        .post(
          `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
          data,
          {
            headers: {
              Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
              apikey: process.env.API_KEY,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          result = res.data;
        })
        .catch((e) => {
          console.log(e)
          //throw new ErrorHandler(404, "Menssagem nao enviada.");
        });
    break;
    };
  }
};
export { startSedeti };