import { WorkoutPlan } from '../types/WorkoutTypes'

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'ppl-split',
    title: 'Push Pull Legs Split',
    description: 'A classic 3-day split targeting all major muscle groups for strength and hypertrophy',
    imageUrl: '/images/plans/ppl-split.jpg',
    level: 'Intermediate',
    days: [
      {
        id: 'push-day',
        title: 'Day 1: Push',
        description: 'Chest, shoulders, and triceps workout',
        imageUrl: '/images/days/push-day.jpg',
        level: 'Intermediate',
        exercises: [
          {
            id: 'bench-press',
            title: 'Bench Press',
            description: 'Fundamental chest exercise',
            imageUrl: '/images/exercises/bench-press.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Chest'
          },
          {
            id: 'shoulder-press',
            title: 'Shoulder Press',
            description: 'Strengthens shoulders',
            imageUrl: '/images/exercises/shoulder-press.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Shoulders'
          },
          {
            id: 'tricep-dips',
            title: 'Tricep Dips',
            description: 'Targets triceps',
            imageUrl: '/images/exercises/tricep-dips.jpg',
            level: 'Intermediate',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Triceps'
          },
          {
            id: 'incline-dumbbell-press',
            title: 'Incline Dumbbell Press',
            description: 'Upper chest focus',
            imageUrl: '/images/exercises/incline-dumbbell-press.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Chest'
          },
          {
            id: 'lateral-raises',
            title: 'Lateral Raises',
            description: 'Builds shoulder width',
            imageUrl: '/images/exercises/lateral-raises.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Shoulders'
          },
          {
            id: 'tricep-pushdown',
            title: 'Tricep Pushdown',
            description: 'Tricep isolation exercise',
            imageUrl: '/images/exercises/tricep-pushdown.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Triceps'
          },
        ],
      },
      {
        id: 'pull-day',
        title: 'Day 2: Pull',
        description: 'Back, biceps, and rear delts workout',
        imageUrl: '/images/days/pull-day.jpg',
        level: 'Intermediate',
        exercises: [
          {
            id: 'pull-up',
            title: 'Pull-Up',
            description: 'Compound back exercise',
            imageUrl: '/images/exercises/pull-up.jpg',
            level: 'Intermediate',
            type: 'bodyweight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Back'
          },
          {
            id: 'barbell-row',
            title: 'Barbell Row',
            description: 'Strengthens the back',
            imageUrl: '/images/exercises/barbell-row.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Back'
          },
          {
            id: 'bicep-curl',
            title: 'Bicep Curl',
            description: 'Isolation for biceps',
            imageUrl: '/images/exercises/bicep-curl.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Biceps'
          },
          {
            id: 'face-pull',
            title: 'Face Pull',
            description: 'Rear delt exercise',
            imageUrl: '/images/exercises/face-pull.jpg',
            level: 'Intermediate',
            type: 'cable',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Shoulders'
          },
          {
            id: 'hammer-curl',
            title: 'Hammer Curl',
            description: 'Targets brachialis',
            imageUrl: '/images/exercises/hammer-curl.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Biceps'
          },
          {
            id: 'lat-pulldown',
            title: 'Lat Pulldown',
            description: 'Works the lats',
            imageUrl: '/images/exercises/lat-pulldown.jpg',
            level: 'Intermediate',
            type: 'cable',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Back'
          },
        ],
      },
      {
        id: 'legs-day',
        title: 'Day 3: Legs',
        description: 'Legs and lower body workout',
        imageUrl: '/images/days/legs-day.jpg',
        level: 'Intermediate',
        exercises: [
          {
            id: 'squat',
            title: 'Squat',
            description: 'Compound leg exercise',
            imageUrl: '/images/exercises/squat.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Legs'
          },
          {
            id: 'leg-press',
            title: 'Leg Press',
            description: 'Machine-based leg exercise',
            imageUrl: '/images/exercises/leg-press.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Legs'
          },
          {
            id: 'lunges',
            title: 'Lunges',
            description: 'Strengthens quads and glutes',
            imageUrl: '/images/exercises/lunges.jpg',
            level: 'Intermediate',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Legs'
          },
          {
            id: 'calf-raise',
            title: 'Calf Raise',
            description: 'Focuses on calves',
            imageUrl: '/images/exercises/calf-raise.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Calves'
          },
          {
            id: 'leg-curl',
            title: 'Leg Curl',
            description: 'Hamstring isolation',
            imageUrl: '/images/exercises/leg-curl.jpg',
            level: 'Intermediate',
            type: 'machine',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Legs'
          },
          {
            id: 'romanian-deadlift',
            title: 'Romanian Deadlift',
            description: 'Targets hamstrings',
            imageUrl: '/images/exercises/romanian-deadlift.jpg',
            level: 'Intermediate',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Legs'
          },
        ],
      },
    ],
  },
  {
    id: 'full-body',
    title: 'Full Body Workout',
    description: 'Complete body workout ideal for beginners',
    imageUrl: '/images/plans/full-body.jpg',
    level: 'Beginner',
    days: [
      {
        id: 'full-body-day1',
        title: 'Day 1: Full Body A',
        description: 'Focus on compound movements',
        imageUrl: '/images/days/full-body-day1.jpg',
        level: 'Beginner',
        exercises: [
          {
            id: 'squat',
            title: 'Squat',
            description: 'Fundamental leg exercise',
            imageUrl: '/images/exercises/squat.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Legs'
          },
          {
            id: 'bench-press',
            title: 'Bench Press',
            description: 'Chest strength exercise',
            imageUrl: '/images/exercises/bench-press.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Chest'
          },
          {
            id: 'barbell-row',
            title: 'Barbell Row',
            description: 'Back exercise',
            imageUrl: '/images/exercises/barbell-row.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Back'
          },
          {
            id: 'bicep-curl',
            title: 'Bicep Curl',
            description: 'Isolates biceps',
            imageUrl: '/images/exercises/bicep-curl.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Biceps'
          },
          {
            id: 'overhead-press',
            title: 'Overhead Press',
            description: 'Shoulder exercise',
            imageUrl: '/images/exercises/overhead-press.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Shoulders'
          },
          {
            id: 'plank',
            title: 'Plank',
            description: 'Core stability exercise',
            imageUrl: '/images/exercises/plank.jpg',
            level: 'Beginner',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Core'
          },
        ],
      },
      {
        id: 'full-body-day2',
        title: 'Day 2: Full Body B',
        description: 'Variation of compound and isolation exercises',
        imageUrl: '/images/days/full-body-day2.jpg',
        level: 'Beginner',
        exercises: [
          {
            id: 'deadlift',
            title: 'Deadlift',
            description: 'Back and leg exercise',
            imageUrl: '/images/exercises/deadlift.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Back'
          },
          {
            id: 'incline-bench-press',
            title: 'Incline Bench Press',
            description: 'Targets upper chest',
            imageUrl: '/images/exercises/incline-bench-press.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Chest'
          },
          {
            id: 'lat-pulldown',
            title: 'Lat Pulldown',
            description: 'Back isolation exercise',
            imageUrl: '/images/exercises/lat-pulldown.jpg',
            level: 'Beginner',
            type: 'cable',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Back'
          },
          {
            id: 'leg-extension',
            title: 'Leg Extension',
            description: 'Quad isolation',
            imageUrl: '/images/exercises/leg-extension.jpg',
            level: 'Beginner',
            type: 'machine',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Legs'
          },
          {
            id: 'tricep-extension',
            title: 'Tricep Extension',
            description: 'Isolates triceps',
            imageUrl: '/images/exercises/tricep-extension.jpg',
            level: 'Beginner',
            type: 'cable',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Triceps'
          },
          {
            id: 'side-plank',
            title: 'Side Plank',
            description: 'Core and obliques',
            imageUrl: '/images/exercises/side-plank.jpg',
            level: 'Beginner',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Core'
          },
        ],
      },
      {
        id: 'full-body-day3',
        title: 'Day 3: Full Body C',
        description: 'Incorporates more bodyweight movements',
        imageUrl: '/images/days/full-body-day3.jpg',
        level: 'Beginner',
        exercises: [
          {
            id: 'lunge',
            title: 'Lunge',
            description: 'Leg and glute exercise',
            imageUrl: '/images/exercises/lunge.jpg',
            level: 'Beginner',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Legs'
          },
          {
            id: 'push-up',
            title: 'Push-Up',
            description: 'Upper body exercise',
            imageUrl: '/images/exercises/push-up.jpg',
            level: 'Beginner',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab-channel=MulliganBrothers',
            category: 'Chest'
          },
          {
            id: 'bent-over-row',
            title: 'Bent Over Row',
            description: 'Back strength exercise',
            imageUrl: '/images/exercises/bent-over-row.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: 'Back'
          },
          {
            id: 'leg-raise',
            title: 'Leg Raise',
            description: 'Lower abs exercise',
            imageUrl: '/images/exercises/leg-raise.jpg',
            level: 'Beginner',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab-channel=MulliganBrothers',
            category: 'Core'
          },
          {
            id: 'bicep-hammer-curl',
            title: 'Bicep Hammer Curl',
            description: 'Targets forearms and biceps',
            imageUrl: '/images/exercises/bicep-hammer-curl.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab-channel=MulliganBrothers',
            category: 'Biceps'
          },
          {
            id: 'mountain-climbers',
            title: 'Mountain Climbers',
            description: 'Full body and cardio',
            imageUrl: '/images/exercises/mountain-climbers.jpg',
            level: 'Beginner',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab-channel=MulliganBrothers',
            category: 'Cardio'
          },
        ],
      },
    ],
  },
];

export const fetchWorkoutPlans = (): Promise<WorkoutPlan[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(WORKOUT_PLANS)
    }, 1000)
  });
};

export const fetchWorkoutPlanById = (planId: string): Promise<WorkoutPlan | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plan = WORKOUT_PLANS.find((p) => p.id === planId);
      resolve(plan);
    }, 1000)
  });
};
