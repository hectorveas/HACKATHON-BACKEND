import { Express } from "express";
import aboutUs from "./about-us"
import admin from "./admin";
import auth from "./auth";
import commune from "./commune";
import region from "./region";
import user from "./user";
import review from "./review";
import consultation from "./consultation";
import content from "./content";
import testimony from "./testimony";
import rent from './rent/index';
import property from './property/index';
import contract from './contract/index';
import payment from './payment/index';
import paymentMethod from './payment-method/index';
import profilePictureVerification from './profile-picture-verification/index';
import service from './service/index';
import location from './location/index'
import category from './category/index';
import code from "./code/index";
import notificationType from './notification-type/index';
import notification from "./notification";
import term from './term/index';
import comission from './comission/index';
import request from './request/index';
import message from './message/index';
import support from './support/index';
import contact from './contact/index';


const components: Express[] = [
  aboutUs,
  admin,
  auth,
  commune,
  region,
  user,
  review,
  consultation,
  content,
  testimony,
  rent,
  property,
  contract,
  payment,
  paymentMethod,
  profilePictureVerification,
  service,
  location,
  category,
  code,
  notificationType,
  notification,
  term,
  comission,
  request,
  message,
  support,
  contact

];

export default components;
