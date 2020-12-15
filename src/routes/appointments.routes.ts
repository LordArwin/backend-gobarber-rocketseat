import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const listAppointments = await appointmentRepository.find();
  return response.json(listAppointments);
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
