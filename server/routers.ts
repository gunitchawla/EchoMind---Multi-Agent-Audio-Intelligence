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
