import { WorkoutPlan } from '../types/WorkoutTypes'

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'ppl-split',
    title: 'Push Pull Legs Split',
    description: 'A classic 3-day split targeting all major muscle groups',
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
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
            category: ''
          },
          {
            id: 'push-up',
            title: 'Push-Up',
            description: 'Upper body exercise',
            imageUrl: '/images/exercises/push-up.jpg',
            level: 'Beginner',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
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
            category: ''
          },
          {
            id: 'leg-raise',
            title: 'Leg Raise',
            description: 'Lower abs exercise',
            imageUrl: '/images/exercises/leg-raise.jpg',
            level: 'Beginner',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'bicep-hammer-curl',
            title: 'Bicep Hammer Curl',
            description: 'Targets forearms and biceps',
            imageUrl: '/images/exercises/bicep-hammer-curl.jpg',
            level: 'Beginner',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'mountain-climbers',
            title: 'Mountain Climbers',
            description: 'Full body and cardio',
            imageUrl: '/images/exercises/mountain-climbers.jpg',
            level: 'Beginner',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
        ],
      },
    ],
  },
  {
    id: 'upper-lower-split',
    title: 'Upper Lower Split',
    description: 'Focuses on upper and lower body strength training',
    imageUrl: '/images/plans/upper-lower.jpg',
    level: 'Advanced',
    days: [
      {
        id: 'upper-day',
        title: 'Day 1: Upper Body',
        description: 'Focus on chest, back, shoulders, and arms',
        imageUrl: '/images/days/upper-day.jpg',
        level: 'Advanced',
        exercises: [
          {
            id: 'bench-press',
            title: 'Bench Press',
            description: 'Chest strength exercise',
            imageUrl: '/images/exercises/bench-press.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'lat-pulldown',
            title: 'Lat Pulldown',
            description: 'Back width exercise',
            imageUrl: '/images/exercises/lat-pulldown.jpg',
            level: 'Advanced',
            type: 'cable',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'shoulder-press',
            title: 'Shoulder Press',
            description: 'Builds shoulder strength',
            imageUrl: '/images/exercises/shoulder-press.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'bicep-curl',
            title: 'Bicep Curl',
            description: 'Bicep isolation',
            imageUrl: '/images/exercises/bicep-curl.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'tricep-dips',
            title: 'Tricep Dips',
            description: 'Tricep exercise',
            imageUrl: '/images/exercises/tricep-dips.jpg',
            level: 'Advanced',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'rear-delt-fly',
            title: 'Rear Delt Fly',
            description: 'Rear shoulder exercise',
            imageUrl: '/images/exercises/rear-delt-fly.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
        ],
      },
      {
        id: 'lower-day',
        title: 'Day 2: Lower Body',
        description: 'Intense leg workout',
        imageUrl: '/images/days/lower-day.jpg',
        level: 'Advanced',
        exercises: [
          {
            id: 'squat',
            title: 'Squat',
            description: 'Core leg strength exercise',
            imageUrl: '/images/exercises/squat.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'deadlift',
            title: 'Deadlift',
            description: 'Posterior chain exercise',
            imageUrl: '/images/exercises/deadlift.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'leg-press',
            title: 'Leg Press',
            description: 'Quad strength exercise',
            imageUrl: '/images/exercises/leg-press.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'calf-raise',
            title: 'Calf Raise',
            description: 'Calf development',
            imageUrl: '/images/exercises/calf-raise.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'leg-curl',
            title: 'Leg Curl',
            description: 'Hamstring isolation',
            imageUrl: '/images/exercises/leg-curl.jpg',
            level: 'Advanced',
            type: 'machine',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'bulgarian-split-squat',
            title: 'Bulgarian Split Squat',
            description: 'Single-leg exercise',
            imageUrl: '/images/exercises/bulgarian-split-squat.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
        ],
      },
      {
        id: 'upper-lower-combo',
        title: 'Day 3: Upper & Lower Combo',
        description: 'Combines upper and lower body exercises',
        imageUrl: '/images/days/upper-lower-combo.jpg',
        level: 'Advanced',
        exercises: [
          {
            id: 'clean-and-press',
            title: 'Clean and Press',
            description: 'Full body exercise',
            imageUrl: '/images/exercises/clean-and-press.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'lunges',
            title: 'Lunges',
            description: 'Leg and glute exercise',
            imageUrl: '/images/exercises/lunges.jpg',
            level: 'Advanced',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'push-up',
            title: 'Push-Up',
            description: 'Upper body endurance',
            imageUrl: '/images/exercises/push-up.jpg',
            level: 'Advanced',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'chin-up',
            title: 'Chin-Up',
            description: 'Upper back and biceps',
            imageUrl: '/images/exercises/chin-up.jpg',
            level: 'Advanced',
            type: 'bodyweight',
            defaultRestPeriod: 90,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'box-jump',
            title: 'Box Jump',
            description: 'Plyometric leg exercise',
            imageUrl: '/images/exercises/box-jump.jpg',
            level: 'Advanced',
            type: 'bodyweight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
          {
            id: 'kettlebell-swing',
            title: 'Kettlebell Swing',
            description: 'Full body cardio and strength',
            imageUrl: '/images/exercises/kettlebell-swing.jpg',
            level: 'Advanced',
            type: 'weight',
            defaultRestPeriod: 60,
            videoUrl: 'https://www.youtube.com/watch?v=tbny6P9TotU&list=TLPQMjUwNjIwMjIEUkDPQVSAQA&index=9&ab_channel=MulliganBrothers',
            category: ''
          },
        ],
      },
    ],
  },
]

export const fetchWorkoutPlans = (): Promise<WorkoutPlan[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(WORKOUT_PLANS)
    }, 1000)
  })
}

export const fetchWorkoutPlanById = (planId: string): Promise<WorkoutPlan | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plan = WORKOUT_PLANS.find((p) => p.id === planId)
      resolve(plan)
    }, 1000)
  })
}
