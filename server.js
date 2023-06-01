const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { Pool } = require("pg");
const { hmacValidator } = require("@adyen/api-library");

//Init app. The var app = express() statement creates a new express application for you. The createApplication function from the lib/express.js file is the default export, which we see as the express() function call.
const app = express();

//Setup request logging, Morgan provides flexibility in defining the format of log messages. A middleware function that will pick up the request object and log whatever you need, like information such as the method used, the origin IP, the requested URL etc.
app.use(morgan("dev"));

//Parse JSON & URL-encoded bodies, When talking about express.json() and express.urlencoded() think specifically about POST requests and PUT Requests. You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data to the server and you are asking the server to accept or store that data, which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request (https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve client from build folder
app.use(express.static(path.join(__dirname, "build")));

// enables environment variables by
// parsing the .env file and assigning it to process.env
dotenv.config({
  path: "./.env",
});

// Adyen Node.js API library boilerplate (configuration, etc.)
const validator = new hmacValidator();

/* ################# DATABASE ###################### */

const pool = new Pool({
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  host: process.env.PG_HOST,
});

app.post("/api/webhook/notification", async (request, response) => {
  var retrieved = false;

  // get the notification request from POST body

  const notificationRequestItems = request.body.notificationItems;

  const notificationTime = request._startTime;

  notificationRequestItems.forEach(({ NotificationRequestItem }) => {
    console.info("Received webhook notification", NotificationRequestItem);

    if (
      validator.validateHMAC(
        NotificationRequestItem,
        process.env.REACT_APP_ADYEN_HMAC_KEY
      )
    ) {
      const timestamp = notificationTime;
      const notification = NotificationRequestItem;
      let pspreference = NotificationRequestItem.pspReference;
      const eventcode = NotificationRequestItem.eventCode
        ? NotificationRequestItem.eventCode
        : "";
      const merchantaccount = NotificationRequestItem.merchantAccountCode
        ? NotificationRequestItem.merchantAccountCode
        : "";
      const merchantreference = NotificationRequestItem.merchantReference
        ? NotificationRequestItem.merchantReference
        : "";
      const shopperreference = NotificationRequestItem.additionalData
        .shopperReference
        ? NotificationRequestItem.additionalData.shopperReference
        : "";
      const paymentmethod = NotificationRequestItem.paymentMethod
        ? NotificationRequestItem.paymentMethod
        : "";
      const amount = NotificationRequestItem.amount.value
        ? NotificationRequestItem.amount.value
        : "";
      const currency = NotificationRequestItem.amount.currency
        ? NotificationRequestItem.amount.currency
        : "";
      const success = NotificationRequestItem.success
        ? NotificationRequestItem.success
        : "";
      const refusalreasonraw = NotificationRequestItem.additionalData
        .refusalReasonRaw
        ? NotificationRequestItem.additionalData.refusalReasonRaw
        : "";
      const networktxreference = NotificationRequestItem.additionalData
        .networkTxReference
        ? NotificationRequestItem.additionalData.networkTxReference
        : "";
      const liabilityshift = NotificationRequestItem.additionalData
        .liabilityShift
        ? NotificationRequestItem.additionalData.liabilityShift
        : "";
      const threedsversion = NotificationRequestItem.additionalData
        .threeDSVersion
        ? NotificationRequestItem.additionalData.threeDSVersion
        : "";
      const threedauthenticated = NotificationRequestItem.additionalData
        .threeDAuthenticated
        ? NotificationRequestItem.additionalData.threeDAuthenticated
        : "";
      const threedauthenticatedresponse = NotificationRequestItem.additionalData
        .threeDAuthenticatedResponse
        ? NotificationRequestItem.additionalData.threeDAuthenticatedResponse
        : "";
      const threedoffered = NotificationRequestItem.additionalData.threeDOffered
        ? NotificationRequestItem.additionalData.threeDOffered
        : "";
      const threedofferedresponse = NotificationRequestItem.additionalData
        .threeDOfferedResponse
        ? NotificationRequestItem.additionalData.threeDOfferedResponse
        : "";
      const expirydate = NotificationRequestItem.additionalData.expiryDate
        ? NotificationRequestItem.additionalData.expiryDate
        : "";
      const cardbin = NotificationRequestItem.additionalData.cardBin
        ? NotificationRequestItem.additionalData.cardBin
        : "";
      const cardsummary = NotificationRequestItem.additionalData.cardSummary
        ? NotificationRequestItem.additionalData.cardSummary
        : "";
      const issuercountry = NotificationRequestItem.additionalData.issuerCountry
        ? NotificationRequestItem.additionalData.issuerCountry
        : "";
      const fundingsource = NotificationRequestItem.additionalData.fundingSource
        ? NotificationRequestItem.additionalData.fundingSource
        : "";
      const metadata = NotificationRequestItem.additionalData.metaData
        ? NotificationRequestItem.additionalData.metaData
        : "";
      const iban = NotificationRequestItem.additionalData.iban
        ? NotificationRequestItem.additionalData.iban
        : "";
      const shopperemail = NotificationRequestItem.additionalData.shopperEmail
        ? NotificationRequestItem.additionalData.shopperEmail
        : "";
      const shopperinteraction = NotificationRequestItem.additionalData
        .shopperInteraction
        ? NotificationRequestItem.additionalData.shopperInteraction
        : "";

      if (NotificationRequestItem.eventCode === "REPORT_AVAILABLE") {
        const pspreference = "";

        try {
          const sendPaymentNotification = pool.query(
            "INSERT INTO paymentsnotification (pspreference, eventcode, timestamp, merchantaccount, notification, merchantReference, shopperreference) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [
              pspreference,
              eventcode,
              timestamp,
              merchantaccount,
              notification,
              merchantreference,
              shopperreference,
            ]
          );
        } catch (error) {
          console.error(error);
        }
      } else if (NotificationRequestItem.eventCode === "AUTHORISATION") {
        try {
          const sendPaymentNotification = pool.query(
            "INSERT INTO paymentsnotification (pspreference, eventcode, timestamp, merchantaccount, notification, merchantReference, shopperreference) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [
              pspreference,
              eventcode,
              timestamp,
              merchantaccount,
              notification,
              merchantreference,
              shopperreference,
            ]
          );

          const sendPaymentListNotification = pool.query(
            "INSERT INTO paymentList (pspreference, eventcode, merchantreference, shopperreference, timestamp, merchantaccount, paymentmethod, amount, currency, success, refusalreasonraw, networktxreference, liabilityshift, threeDSVersion, threedauthenticated, threedauthenticatedresponse, threedoffered, threedofferedresponse, expirydate, cardbin, cardsummary, issuercountry, fundingsource, metadata, iban, shopperemail, shopperInteraction) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)",
            [
              pspreference,
              eventcode,
              merchantreference,
              shopperreference,
              timestamp,
              merchantaccount,
              paymentmethod,
              amount,
              currency,
              success,
              refusalreasonraw,
              networktxreference,
              liabilityshift,
              threedsversion,
              threedauthenticated,
              threedauthenticatedresponse,
              threedoffered,
              threedofferedresponse,
              expirydate,
              cardbin,
              cardsummary,
              issuercountry,
              fundingsource,
              metadata,
              iban,
              shopperemail,
              shopperinteraction,
            ]
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const sendPaymentNotification = pool.query(
            "INSERT INTO paymentsnotification (pspreference, eventcode, timestamp, merchantaccount, notification, merchantReference, shopperreference) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [
              pspreference,
              eventcode,
              timestamp,
              merchantaccount,
              notification,
              merchantreference,
              shopperreference,
            ]
          );
        } catch (error) {
          console.error(error);
        }
      }

      retrieved = true;
    } else {
      // invalid hmac: notification cannot be accepted
      retrieved = false;
      return false; // exit from loop
    }
  });

  if (retrieved) {
    response.send("[accepted]");
  } else {
    response.status(401).send("Invalid HMAC signature");
  }
});

app.post(
  "/api/webhook/balanceplatform/notifications",
  async (request, response) => {
    const timestamp = request._startTime;
    const balancenotification = request.body;
    const balanceplatform = balancenotification.data.balancePlatform;
    const type = balancenotification.type;

    let accountholderid = "";
    let balanceaccountid = "";
    let legalentityid = "";
    let paymentinstrumentid = "";
    let transferid = "";
    let psppaymentreference = "";
    let transactionid = "";
    let reference = "";

    if (
      request.body.type === "balancePlatform.transfer.created" ||
      request.body.type === "balancePlatform.transfer.updated"
    ) {
      const accountholderid = balancenotification.data.accountHolder.id
        ? balancenotification.data.accountHolder.id
        : "";

      const balanceaccountid = balancenotification.data.balanceAccount.id
        ? balancenotification.data.balanceAccount.id
        : "";

      const transferid = balancenotification.data.id
        ? balancenotification.data.id
        : "";

      const psppaymentreference = balancenotification.data.pspPaymentReference
        ? balancenotification.data.pspPaymentReference
        : "";

      const transactionid = balancenotification.data.transactionId
        ? balancenotification.data.transactionId
        : "";

      const reference = balancenotification.data.reference
        ? balancenotification.data.reference
        : "";

      try {
        const sendBalancePlatformNotification = pool.query(
          "INSERT INTO balanceplatformnotification (timestamp, balancenotification, type, balanceplatform, accountholderid, balanceaccountid, legalentityid, paymentinstrumentid, transferid, psppaymentreference, transactionid, reference) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            timestamp,
            balancenotification,
            type,
            balanceplatform,
            accountholderid,
            balanceaccountid,
            legalentityid,
            paymentinstrumentid,
            transferid,
            psppaymentreference,
            transactionid,
            reference,
          ]
        );
      } catch (error) {
        console.error(error);
      }
    } else if (
      request.body.type === "balancePlatform.accountHolder.created" ||
      request.body.type === "balancePlatform.accountHolder.updated"
    ) {
      const accountholderid = balancenotification.data.accountHolder.id
        ? balancenotification.data.accountHolder.id
        : "";

      const legalentityid = balancenotification.data.accountHolder.legalEntityId
        ? balancenotification.data.accountHolder.legalEntityId
        : "";

      const reference = balancenotification.data.accountHolder.reference
        ? balancenotification.data.accountHolder.reference
        : "";

      try {
        const sendBalancePlatformNotification = pool.query(
          "INSERT INTO balanceplatformnotification (timestamp, balancenotification, type, balanceplatform, accountholderid, balanceaccountid, legalentityid, paymentinstrumentid, transferid, psppaymentreference, transactionid, reference) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            timestamp,
            balancenotification,
            type,
            balanceplatform,
            accountholderid,
            balanceaccountid,
            legalentityid,
            paymentinstrumentid,
            transferid,
            psppaymentreference,
            transactionid,
            reference,
          ]
        );
      } catch (error) {
        console.error(error);
      }
    } else if (
      request.body.type === "balancePlatform.balanceAccount.created" ||
      request.body.type === "balancePlatform.balanceAccount.updated"
    ) {
      const accountholderid = balancenotification.data.balanceAccount
        .accountHolderId
        ? balancenotification.data.balanceAccount.accountHolderId
        : "";

      const balanceaccountid = balancenotification.data.balanceAccount.id
        ? balancenotification.data.balanceAccount.id
        : "";

      const reference = balancenotification.data.balanceAccount.reference
        ? balancenotification.data.balanceAccount.reference
        : "";

      try {
        const sendBalancePlatformNotification = pool.query(
          "INSERT INTO balanceplatformnotification (timestamp, balancenotification, type, balanceplatform, accountholderid, balanceaccountid, legalentityid, paymentinstrumentid, transferid, psppaymentreference, transactionid, reference) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            timestamp,
            balancenotification,
            type,
            balanceplatform,
            accountholderid,
            balanceaccountid,
            legalentityid,
            paymentinstrumentid,
            transferid,
            psppaymentreference,
            transactionid,
            reference,
          ]
        );
      } catch (error) {
        console.error(error);
      }
    } else if (
      request.body.type === "balancePlatform.paymentInstrument.created" ||
      request.body.type === "balancePlatform.paymentInstrument.updated"
    ) {
      const balanceaccountid = balancenotification.data.paymentInstrument
        .balanceAccountId
        ? balancenotification.data.paymentInstrument.balanceAccountId
        : "";

      const paymentinstrumentid = balancenotification.data.paymentInstrument.id
        ? balancenotification.data.paymentInstrument.id
        : "";

      const reference = balancenotification.data.paymentInstrument.reference
        ? balancenotification.data.paymentInstrument.reference
        : "";

      try {
        const sendBalancePlatformNotification = pool.query(
          "INSERT INTO balanceplatformnotification (timestamp, balancenotification, type, balanceplatform, accountholderid, balanceaccountid, legalentityid, paymentinstrumentid, transferid, psppaymentreference, transactionid, reference) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            timestamp,
            balancenotification,
            type,
            balanceplatform,
            accountholderid,
            balanceaccountid,
            legalentityid,
            paymentinstrumentid,
            transferid,
            psppaymentreference,
            transactionid,
            reference,
          ]
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const sendBalancePlatformNotification = pool.query(
          "INSERT INTO balanceplatformnotification (timestamp, balancenotification, type, balanceplatform, accountholderid, balanceaccountid, legalentityid, paymentinstrumentid, transferid, psppaymentreference, transactionid, reference) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            timestamp,
            balancenotification,
            type,
            balanceplatform,
            accountholderid,
            balanceaccountid,
            legalentityid,
            paymentinstrumentid,
            transferid,
            psppaymentreference,
            transactionid,
            reference,
          ]
        );
      } catch (error) {
        console.error(error);
      }
    }

    response.send("[accepted]");
  }
);

/* ################# DATABASE INFO ###################### */

app.get("/paymentsNotification", async (request, response) => {
  try {
    const getPaymentNotifications = await pool.query(
      "SELECT * FROM paymentsnotification ORDER BY id DESC LIMIT 50;"
    );
    response.json(getPaymentNotifications);
  } catch (error) {
    console.error(error);
  }
});

app.get("/balanceNotification", async (request, response) => {
  try {
    console.log("test");
    const getBalanceNotifications = await pool.query(
      "SELECT * FROM balanceplatformnotification ORDER BY id DESC LIMIT 50;"
    );
    response.json(getBalanceNotifications);
  } catch (error) {
    console.error(error);
  }
});

/* ################# CLIENT SIDE ENDPOINTS ###################### */

// Handles any requests that doesn't match the above
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});

/* ################# UTILS ###################### */

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
