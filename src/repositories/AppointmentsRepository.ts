import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentRepo {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentRepo): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }

  public findDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(apt =>
      isEqual(date, apt.date),
    );
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
