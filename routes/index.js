import roomTypeRoute from './roomType.route.js';
import roomRoute from './rooms.routes.js';
import authRoute from './auth.routes.js';

export default (router)=>{
  router.use("/v1", roomTypeRoute);
  router.use("/v1", roomRoute);
  router.use("/v1",authRoute);

  return router;
};
