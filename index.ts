import { ApolloServerPlugin } from "apollo-server-plugin-base";
import LogreIOClient, { Box } from "logreio";

export default function (box: Box): ApolloServerPlugin {
  const logger = new LogreIOClient(box);

  return {
    serverWillStart() {
      logger.info({
        message: "Server will start.",
        event: "server_will_start",
      });
    },

    requestDidStart(requestContext) {
      logger.info({
        message: "Request did start.",
        event: "request_did_start",
        context: requestContext,
      });

      return {
        parsingDidStart(requestContext) {
          const startedAt = getTime();

          logger.info({
            message: "Parsing did start.",
            event: "parsing_did_start",
            timestamp: startedAt,
            context: requestContext,
          });

          return (errors) => {
            const finishedAt = getTime();
            const duration = finishedAt - startedAt;

            if (errors) {
              logger.error({
                message: "Parsing failed.",
                event: "parsing_failed",
                timestamp: finishedAt,
                duration,
                errors,
                context: requestContext,
              });
            } else {
              logger.info({
                message: "Parsing finished.",
                event: "parsing_finished",
                timestamp: finishedAt,
                duration,
                errors,
                context: requestContext,
              });
            }
          };
        },

        validationDidStart(requestContext) {
          const startedAt = getTime();

          logger.info({
            message: "Validation did start.",
            event: "validation_did_start",
            timestamp: startedAt,
            context: requestContext,
          });

          return (errors) => {
            const finishedAt = getTime();
            const duration = finishedAt - startedAt;

            if (errors) {
              logger.error({
                message: "Validation failed.",
                event: "validation_failed",
                timestamp: finishedAt,
                duration,
                errors,
                context: requestContext,
              });
            }
          };
        },

        executionDidStart() {
          const startedAt = getTime();

          logger.info({
            message: "Execution did start.",
            event: "execution_did_start",
            timestamp: startedAt,
            context: requestContext,
          });

          return (errors) => {
            const finishedAt = getTime();
            const duration = finishedAt - startedAt;

            if (errors) {
              logger.error({
                message: "Execution failed.",
                event: "execution_failed",
                timestamp: finishedAt,
                duration,
                errors,
                context: requestContext,
              });
            }
          };
        },
      };
    },
  };
}

function getTime() {
  return new Date().getTime();
}
