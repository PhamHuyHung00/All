package com.javahungph.redis.subscriber;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

public class Receiver implements MessageListener {
    @Override
    public void onMessage(Message message, byte[] pattern) {
//     logger.info("Consumed event {}", message);
        System.out.println("Message: " + message);
    }

}
