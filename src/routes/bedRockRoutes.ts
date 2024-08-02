import express, {Request, Response} from "express";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const router = express.Router();

router.post("/", async(req:Request, res:Response)=>{

    try{  
        const client = new BedrockRuntimeClient({
            region: process.env.AWS_REGION as string,
            credentials:{
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
                accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                sessionToken: process.env.AWS_SESSION_TOKEN as string
            }
        });

        const prompt = `
            Define, in terms a young child would understand, what the meaning of life is. You should answer by using a short story as an example.
        `;

        const input = {
            modelId: "amazon.titan-text-lite-v1",
            contentType:"application/json",
            accept:"application/json",
            body: JSON.stringify({
                inputText: prompt,
                textGenerationConfig: {
                    maxTokenCount: 512
                }
            })
        };

        const command = new InvokeModelCommand(input);
        const resp = await client.send(command);
       // console.log("🚀 ~ router.post ~ resp:", resp); 
        const decodedResponseBody = JSON.parse(new TextDecoder().decode(resp.body));
        console.log("🚀 ~ router.post ~ decodedResponseBody:", decodedResponseBody);
   }catch(err){
    console.log("Error", err);
   }

});

export default router;

