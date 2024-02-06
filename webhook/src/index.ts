import express, { Request, Response } from "express";
import amqp from "amqplib/callback_api";

const app = express();
const port = 3000;

const rabbitmqConfig = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "user_queue",
  password: "pass_queue",
};

app.use(express.json());

app.post("/request-support", (req: Request, res: Response) => {
  const message = req.body;

  sendMessageToQueue(message);

  res.sendStatus(200);
});

function sendMessageToQueue(message: any) {
  amqp.connect(rabbitmqConfig, (error, connection) => {
    if (error) {
      console.log("[amqp.connect] Error:", error);
    }

    connection.createChannel((error, channel) => {
      if (error) {
        throw error;
      }

      const queue = "minha_fila";

      channel.assertQueue(queue);

      if (channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))) {
        console.log("[amqp.connect] Message sent!", message);
      }
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
}

app.on("error", (error) => {
  console.log("Error:", error);
});

app.listen(port, () => {
  console.log(`Listening on ::${port}`);
});
