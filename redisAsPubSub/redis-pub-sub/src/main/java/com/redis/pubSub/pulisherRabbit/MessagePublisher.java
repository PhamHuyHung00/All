package com.redis.pubSub.pulisherRabbit;

import com.redis.pubSub.configRabbitmq.MessagingConfig;
import com.redis.pubSub.model.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class MessagePublisher {
    @Autowired
    private RabbitTemplate template;

    @PostMapping
    public String bookOrder(@RequestBody Message message) {
//        message.setData("MIMI");
//        message.setAuthor("MAMA");
        template.convertAndSend(MessagingConfig.EXCHANGE, MessagingConfig.ROUTING_KEY, message);
        return "Success !!";
    }
}
