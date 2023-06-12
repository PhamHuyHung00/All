package com.redis.pubSub.configuration;

public interface MessagePublisher {
    void publish(String message);
}
