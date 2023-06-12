package com.javahungph.rabbitmq.demo.consumer;

import com.javahungph.rabbitmq.demo.config.MessagingConfig;
import com.javahungph.rabbitmq.demo.dto.OrderStatus;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class User {
    @RabbitListener(queues = MessagingConfig.QUEUE)
    public void consumerMessageFromQueue(OrderStatus orderStatus) {
        System.out.println("Message recieved from queue : "+ orderStatus);
    }
}
