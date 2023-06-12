package com.redis.pubSub.consumerRabbit;

import com.redis.pubSub.configRabbitmq.MessagingConfig;
import com.redis.pubSub.configuration.RedisMessagePublisher;
import com.redis.pubSub.model.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class User {
    @Autowired
    private RedisMessagePublisher messagePublisher;

    @RabbitListener(queues = MessagingConfig.QUEUE)
    public void consumerMessageFromQueue(Message message) {
        messagePublisher.publish(message.toString());
        System.out.println("Message recieved from queue : "+ message);
    }
}
