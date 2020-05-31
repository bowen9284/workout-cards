import { Workout } from './../../../api/src/models/Workout';
import { apiEndpoint } from '../config';

import axios from 'axios';

export async function createWorkout(
  idToken: string,
  newWorkout: Workout
): Promise<Workout> {
  const response = await axios.post(
    `${apiEndpoint}/workout`,
    JSON.stringify(newWorkout),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.item;
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await axios.get(`${apiEndpoint}/workouts`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.items
}

export async function getWorkout(workoutId: string): Promise<Workout> {
    const response = await axios.get(`${apiEndpoint}/workouts/${workoutId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data.item.Items
  }
  