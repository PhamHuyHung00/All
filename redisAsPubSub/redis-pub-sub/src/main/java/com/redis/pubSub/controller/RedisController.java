package com.redis.pubSub.controller;

import com.redis.pubSub.configuration.RedisMessagePublisher;
import com.redis.pubSub.configuration.RedisMessageSubscriber;
import com.redis.pubSub.model.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/redis")
public class RedisController {
    public static Logger logger = LoggerFactory.getLogger(RedisController.class);
    @Autowired
    private RedisMessagePublisher messagePublisher;

//    @Autowired
//    private RedisMessageSubscriber redisMessageSubscriber;

    @PostMapping("/publish")
    public void publish(@RequestBody Message message){
        logger.info(">> publishing: {}", message);
        messagePublisher.publish(message.toString());
    }

    @GetMapping("/subscribe")
    public List<String> getMessage(){
     return RedisMessageSubscriber.messageList;
    }

}
