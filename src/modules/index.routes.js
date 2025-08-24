import companyRouter from "./company/company.router.js";
import jobRouter from "./job/job.router.js";
import userRouter from "./user/user.router.js";

export const bootstrap = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/company", companyRouter);
  app.use("/api/v1/job", jobRouter);
};
