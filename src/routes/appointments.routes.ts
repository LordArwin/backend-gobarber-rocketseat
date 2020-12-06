import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentRouter.get('/', (request, response) => {
  const listAppointments = appointmentRepository.all();
  return response.json(listAppointments);
});

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppointmendInSameTime = appointmentRepository.findDate(parsedDate);
  if (findAppointmendInSameTime) {
    return response.status(400).json({ msg: 'Date is already booked' });
  }
  const appointment = appointmentRepository.create({
    provider,
    date: parsedDate,
  });
  return response.json(appointment);
});

export default appointmentRouter;
