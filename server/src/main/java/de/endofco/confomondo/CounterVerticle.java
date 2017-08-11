package de.endofco.confomondo;

import de.endofco.confomondo.model.UsersAction;
import de.endofco.confomondo.service.CounterService;
import de.endofco.confomondo.service.UsersService;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.PermittedOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;
import io.vertx.ext.web.handler.sockjs.SockJSHandlerOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static de.endofco.confomondo.service.CounterService.TOTAL;

public class CounterVerticle extends AbstractVerticle {

    static final Logger LOG = LoggerFactory.getLogger(CounterVerticle.class);
    public static final String EB_SERVICE_COUNTER_USERS_SYNC = "service.counter.users.sync";
    CounterService counterService = new CounterService();
    final UsersService usersService = new UsersService();


    @Override
    public void start(Future<Void> startFuture) throws Exception {
        super.start();
        // Create the event bus bridge and add it to the router.
        SockJSHandlerOptions handlerOptions = new SockJSHandlerOptions().setHeartbeatInterval(2000);

        SockJSHandler sockJSHandler = SockJSHandler.create(vertx, handlerOptions);

        BridgeOptions options = new BridgeOptions();
        options
                .addOutboundPermitted(new PermittedOptions().setAddress("service.counter.users"))
                .addInboundPermitted(new PermittedOptions().setAddress(EB_SERVICE_COUNTER_USERS_SYNC))
                .addInboundPermitted(new PermittedOptions().setAddress("service.counter.users"))
                .addOutboundPermitted(new PermittedOptions().setAddress("service.counter.actions"))
                .addInboundPermitted(new PermittedOptions().setAddress("service.counter.total"))
                .addInboundPermitted(new PermittedOptions().setAddress("service.counter.actions"));

        sockJSHandler.bridge(options);
        Router router = Router.router(vertx);
        router.route("/eventbus/*").handler(sockJSHandler);


        router.get("/").handler(rc -> {
            rc.response().end("Welcome");
        });
        router.get("/api").handler(rc -> {
            rc.response().end(new JsonObject().put("name", "test-api").put("version", 1).encode());
        });


        vertx
                .createHttpServer()
                .requestHandler(router::accept)
                .listen(8080, handler -> {
                    if (handler.succeeded()) {
                        LOG.info("succesfully started verticle under: http://localhost:8080/");
                    } else {
                        LOG.error("Failed to listen on port 8080");
                    }
                });


        final EventBus eb = vertx.eventBus();


        // intercept any action messages and reflect their command to the local store
        eb.consumer("service.counter.actions", message -> {
            LOG.debug("Actions!: {}", message.body());
            final JsonObject body = JsonObject.mapFrom(message.body());
            if (body != null) {
                String event = body.getString("type");
                LOG.debug("Doing a : {}", event);
                this.counterService.handleEvent(event);
            }
            message.reply(message);
        });

        // intercept any new user logins messages and reflect their command to the local store
        eb.consumer("service.counter.users", message -> this.handleUserAction(message));
        eb.consumer(EB_SERVICE_COUNTER_USERS_SYNC, message -> this.handleUserAction(message));

        eb.consumer("service.counter.total", message -> {
            final int total = this.counterService.handleEvent(TOTAL);
            LOG.debug("Current total: {}", total);
            message.reply(total);
        });


    }

    /**
     * @param message
     */
    public void handleUserAction(Message<Object> message) {

        LOG.debug("Actions!: {}", message.body());
        final JsonObject newUser = JsonObject.mapFrom(message.body());
        UsersAction ua = new UsersAction();

        if (newUser != null) {
            String event = newUser.getString("type");
            String currentUser = newUser.getString("payload");
            LOG.debug("New user logged in: {}", currentUser);

            ua.setType(event);
            LOG.debug("Getting event type: {}", event);
            ua.setPayload(this.usersService.handleEvent(event, currentUser));

        }

        JsonObject currentUsers = JsonObject.mapFrom(ua);
        LOG.debug("Current users in the system: {}", currentUsers);
        message.reply(currentUsers);
    }


}
