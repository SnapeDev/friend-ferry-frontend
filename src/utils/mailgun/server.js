import FormData from "form-data";
import Mailgun from "mailgun.js";
import hb from "handlebars";

import paymentConfirmationAdmin from "./templates/payment-confirmation-admin";
import paymentConfirmationUser from "./templates/payment-confirmation-user";
import paymentConfirmationCompanion from "./templates/payment-confirmation-companion";

import signupConfirmationUser from "./templates/signup-confirmation-user";

import bookingConfirmationAdmin from "./templates/booking-confirmation-admin";
import bookingConfirmationUser from "./templates/booking-confirmation-user";
import bookingDeclinationAdmin from "./templates/booking-declination-admin";
import bookingDeclinationUser from "./templates/booking-declination-user";

const templates = {
	"payment-confirmation-admin": paymentConfirmationAdmin,
	"payment-confirmation-user": paymentConfirmationUser,
	"payment-confirmation-companion": paymentConfirmationCompanion,
	"signup-confirmation-user": signupConfirmationUser,
	"booking-confirmation-admin": bookingConfirmationAdmin,
	"booking-confirmation-user": bookingConfirmationUser,
	"booking-declination-admin": bookingDeclinationAdmin,
	"booking-declination-user": bookingDeclinationUser,
};

import {
	MAILGUN_API_KEY,
	MAILGUN_DOMAIN,
	MAILGUN_FROM,
	MAILGUN_URL,
} from "../server-constants";

const mailgun = new Mailgun(FormData);

export const mg = mailgun.client({
	username: "api",
	key: MAILGUN_API_KEY,
	url: MAILGUN_URL,
});

function formatCurrency(number) {
	const currency = "GBP";
	const locale = "en-UK";

	return Number(number).toLocaleString(locale, {
		style: "currency",
		currency: currency,
		currencyDisplay: "symbol",
	});
}

function formatDate(date) {
	const locale = "en-UK";

	return new Date(date).toLocaleString(locale);
}

hb.registerHelper("formatCurrency", formatCurrency);
hb.registerHelper("formatDate", formatDate);

function handlebars(rawTemplate, params) {
	const template = hb.compile(rawTemplate);
	const result = template(Object.assign({}, params));
	return result;
}

export async function sendEmail({ to, subject, templateId, params }) {
	const template = templates[templateId];

	const data = {
		from: MAILGUN_FROM,
		to,
		subject,
		html: handlebars(template, params),
	};

	const response = await mg.messages.create(MAILGUN_DOMAIN, data);
	return response;
}
