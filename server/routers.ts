import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getSensors, getSensorById, getAudioEvents, getAudioEventsBySensor, getAlerts, getActiveAlerts, getUserNotifications, getUserReports, getAuditLogs, getSystemConfig } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Dashboard and monitoring
  dashboard: router({
    stats: publicProcedure.query(async () => {
      const events = await getAudioEvents(100);
      const alerts = await getActiveAlerts();
      const sensors = await getSensors();
      return {
        totalEvents: events.length,
        activeAlerts: alerts.length,
        activeSensors: sensors.filter(s => s.status === 'online').length,
        totalSensors: sensors.length,
      };
    }),
  }),

  // Sensors management
  sensors: router({
    list: publicProcedure.query(async () => {
      return getSensors();
    }),
    getById: publicProcedure.input((val: unknown) => {
      if (typeof val === 'object' && val !== null && 'id' in val) {
        return (val as { id: number }).id;
      }
      throw new Error('Invalid input');
    }).query(async ({ input }) => {
      return getSensorById(input);
    }),
  }),

  // Audio events
  events: router({
    list: publicProcedure.query(async () => {
      return getAudioEvents(100);
    }),
    bySensor: publicProcedure.input((val: unknown) => {
      if (typeof val === 'object' && val !== null && 'sensorId' in val) {
        return (val as { sensorId: number }).sensorId;
      }
      throw new Error('Invalid input');
    }).query(async ({ input }) => {
      return getAudioEventsBySensor(input);
    }),
  }),

  // Alerts
  alerts: router({
    list: publicProcedure.query(async () => {
      return getAlerts(50);
    }),
    active: publicProcedure.query(async () => {
      return getActiveAlerts();
    }),
    sendSms: publicProcedure.input((val: unknown) => {
      if (typeof val === 'object' && val !== null && 'mobileNumber' in val && 'threatType' in val && 'riskScore' in val) {
        return val as { mobileNumber: string, threatType: string, riskScore: number };
      }
      throw new Error('Invalid input');
    }).mutation(async ({ input }) => {
      const { mobileNumber, threatType, riskScore } = input;
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

      if (accountSid && accountSid !== 'your_account_sid_here' && authToken && twilioNumber) {
        try {
          const body = new URLSearchParams({
            To: mobileNumber,
            From: twilioNumber,
            Body: `🚨 CRITICAL ALERT: ${threatType} detected! Risk Score: ${riskScore}. Please check the Audio Intelligence Security Dashboard immediately.`,
          });

          const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64'),
            },
            body: body.toString(),
          });

          if (!response.ok) {
            const error = await response.text();
            console.error('[SMS ERROR]', error);
            throw new Error('Failed to send SMS via Twilio');
          }
          console.log(`[SMS SUCCESS] Alert sent to ${mobileNumber}`);
          return { success: true, message: "Alert SMS sent successfully" };
        } catch (error) {
          console.error('[SMS ERROR]', error);
          throw new Error('Failed to send SMS');
        }
      } else {
        // Fallback to mock if Twilio is not configured
        console.log(`[SMS MOCK] Twilio not configured. Simulated alert to ${mobileNumber}: CRITICAL THREAT DETECTED: ${threatType} (Risk: ${riskScore})`);
        return { success: true, message: "Alert SMS simulated (configure Twilio for real SMS)" };
      }
    }),
  }),

  // Reports
  reports: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserReports(ctx.user.id);
    }),
  }),

  // Notifications
  notifications: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserNotifications(ctx.user.id);
    }),
  }),

  // Audit logs
  auditLogs: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return getAuditLogs(100);
    }),
  }),
});

export type AppRouter = typeof appRouter;
