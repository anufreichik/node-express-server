import express from 'express';
export default function parseResponse(app) {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
}
