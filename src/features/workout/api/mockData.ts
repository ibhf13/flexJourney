import { WorkoutPlan } from '../types/WorkoutTypes';

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
                    { id: 'bench-press', title: 'Bench Press', description: 'Fundamental chest exercise', imageUrl: '/images/exercises/bench-press.jpg', videoUrl: 'https://youtube.com/watch?v=bench-press', level: 'Intermediate', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'shoulder-press', title: 'Shoulder Press', description: 'Strengthens shoulders', imageUrl: '/images/exercises/shoulder-press.jpg', videoUrl: 'https://youtube.com/watch?v=shoulder-press', level: 'Intermediate', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'tricep-dips', title: 'Tricep Dips', description: 'Targets triceps', imageUrl: '/images/exercises/tricep-dips.jpg', videoUrl: 'https://youtube.com/watch?v=tricep-dips', level: 'Intermediate', type: 'bodyweight', defaultRestPeriod: 60 },
                    { id: 'incline-dumbbell-press', title: 'Incline Dumbbell Press', description: 'Upper chest focus', imageUrl: '/images/exercises/incline-dumbbell-press.jpg', videoUrl: 'https://youtube.com/watch?v=incline-dumbbell-press', level: 'Intermediate', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'lateral-raises', title: 'Lateral Raises', description: 'Builds shoulder width', imageUrl: '/images/exercises/lateral-raises.jpg', videoUrl: 'https://youtube.com/watch?v=lateral-raises', level: 'Intermediate', type: 'weight', defaultRestPeriod: 60 },
                    { id: 'tricep-pushdown', title: 'Tricep Pushdown', description: 'Tricep isolation exercise', imageUrl: '/images/exercises/tricep-pushdown.jpg', videoUrl: 'https://youtube.com/watch?v=tricep-pushdown', level: 'Intermediate', type: 'weight', defaultRestPeriod: 60 }
                ],
            },
            {
                id: 'pull-day',
                title: 'Day 2: Pull',
                description: 'Back, biceps, and rear delts workout',
                imageUrl: '/images/days/pull-day.jpg',
                level: 'Intermediate',
                exercises: [
                    { id: 'pull-up', title: 'Pull-Up', description: 'Compound back exercise', imageUrl: '/images/exercises/pull-up.jpg', videoUrl: 'https://youtube.com/watch?v=pull-up', level: 'Intermediate', type: 'bodyweight', defaultRestPeriod: 90 },
                    { id: 'barbell-row', title: 'Barbell Row', description: 'Strengthens the back', imageUrl: '/images/exercises/barbell-row.jpg', videoUrl: 'https://youtube.com/watch?v=barbell-row', level: 'Intermediate', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'bicep-curl', title: 'Bicep Curl', description: 'Isolation for biceps', imageUrl: '/images/exercises/bicep-curl.jpg', videoUrl: 'https://youtube.com/watch?v=bicep-curl', level: 'Intermediate', type: 'weight', defaultRestPeriod: 60 },
                    { id: 'face-pull', title: 'Face Pull', description: 'Rear delt exercise', imageUrl: '/images/exercises/face-pull.jpg', videoUrl: 'https://youtube.com/watch?v=face-pull', level: 'Intermediate', type: 'cable', defaultRestPeriod: 60 },
                    { id: 'hammer-curl', title: 'Hammer Curl', description: 'Targets brachialis', imageUrl: '/images/exercises/hammer-curl.jpg', videoUrl: 'https://youtube.com/watch?v=hammer-curl', level: 'Intermediate', type: 'weight', defaultRestPeriod: 60 },
                    { id: 'lat-pulldown', title: 'Lat Pulldown', description: 'Works the lats', imageUrl: '/images/exercises/lat-pulldown.jpg', videoUrl: 'https://youtube.com/watch?v=lat-pulldown', level: 'Intermediate', type: 'cable', defaultRestPeriod: 90 }
                ],
            },
            {
                id: 'legs-day',
                title: 'Day 3: Legs',
                description: 'Legs and lower body workout',
                imageUrl: '/images/days/legs-day.jpg',
                level: 'Intermediate',
                exercises: [
                    { id: 'squat', title: 'Squat', description: 'Compound leg exercise', imageUrl: '/images/exercises/squat.jpg', videoUrl: 'https://youtube.com/watch?v=squat', level: 'Intermediate', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'leg-press', title: 'Leg Press', description: 'Machine-based leg exercise', imageUrl: '/images/exercises/leg-press.jpg', videoUrl: 'https://youtube.com/watch?v=leg-press', level: 'Intermediate', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'lunges', title: 'Lunges', description: 'Strengthens quads and glutes', imageUrl: '/images/exercises/lunges.jpg', videoUrl: 'https://youtube.com/watch?v=lunges', level: 'Intermediate', type: 'bodyweight', defaultRestPeriod: 60 },
                    { id: 'calf-raise', title: 'Calf Raise', description: 'Focuses on calves', imageUrl: '/images/exercises/calf-raise.jpg', videoUrl: 'https://youtube.com/watch?v=calf-raise', level: 'Intermediate', type: 'weight', defaultRestPeriod: 60 },
                    { id: 'leg-curl', title: 'Leg Curl', description: 'Hamstring isolation', imageUrl: '/images/exercises/leg-curl.jpg', videoUrl: 'https://youtube.com/watch?v=leg-curl', level: 'Intermediate', type: 'machine', defaultRestPeriod: 60 },
                    { id: 'romanian-deadlift', title: 'Romanian Deadlift', description: 'Targets hamstrings', imageUrl: '/images/exercises/romanian-deadlift.jpg', videoUrl: 'https://youtube.com/watch?v=romanian-deadlift', level: 'Intermediate', type: 'weight', defaultRestPeriod: 90 }
                ],
            }
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
                    { id: 'squat', title: 'Squat', description: 'Fundamental leg exercise', imageUrl: '/images/exercises/squat.jpg', videoUrl: 'https://youtube.com/watch?v=squat', level: 'Beginner', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'bench-press', title: 'Bench Press', description: 'Chest strength exercise', imageUrl: '/images/exercises/bench-press.jpg', videoUrl: 'https://youtube.com/watch?v=bench-press', level: 'Beginner', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'barbell-row', title: 'Barbell Row', description: 'Back exercise', imageUrl: '/images/exercises/barbell-row.jpg', videoUrl: 'https://youtube.com/watch?v=barbell-row', level: 'Beginner', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'bicep-curl', title: 'Bicep Curl', description: 'Isolates biceps', imageUrl: '/images/exercises/bicep-curl.jpg', videoUrl: 'https://youtube.com/watch?v=bicep-curl', level: 'Beginner', type: 'weight', defaultRestPeriod: 60 },
                    { id: 'overhead-press', title: 'Overhead Press', description: 'Shoulder exercise', imageUrl: '/images/exercises/overhead-press.jpg', videoUrl: 'https://youtube.com/watch?v=overhead-press', level: 'Beginner', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'plank', title: 'Plank', description: 'Core stability exercise', imageUrl: '/images/exercises/plank.jpg', videoUrl: 'https://youtube.com/watch?v=plank', level: 'Beginner', type: 'bodyweight', defaultRestPeriod: 60 }
                ],
            },
            {
                id: 'full-body-day2',
                title: 'Day 2: Full Body B',
                description: 'Variation of compound and isolation exercises',
                imageUrl: '/images/days/full-body-day2.jpg',
                level: 'Beginner',
                exercises: [
                    { id: 'deadlift', title: 'Deadlift', description: 'Back and leg exercise', imageUrl: '/images/exercises/deadlift.jpg', videoUrl: 'https://youtube.com/watch?v=deadlift', level: 'Beginner', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'incline-bench-press', title: 'Incline Bench Press', description: 'Targets upper chest', imageUrl: '/images/exercises/incline-bench-press.jpg', videoUrl: 'https://youtube.com/watch?v=incline-bench-press', level: 'Beginner', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'lat-pulldown', title: 'Lat Pulldown', description: 'Back isolation exercise', imageUrl: '/images/exercises/lat-pulldown.jpg', videoUrl: 'https://youtube.com/watch?v=lat-pulldown', level: 'Beginner', type: 'cable', defaultRestPeriod: 90 },
                    { id: 'leg-extension', title: 'Leg Extension', description: 'Quad isolation', imageUrl: '/images/exercises/leg-extension.jpg', videoUrl: 'https://youtube.com/watch?v=leg-extension', level: 'Beginner', type: 'machine', defaultRestPeriod: 60 },
                    { id: 'tricep-extension', title: 'Tricep Extension', description: 'Isolates triceps', imageUrl: '/images/exercises/tricep-extension.jpg', videoUrl: 'https://youtube.com/watch?v=tricep-extension', level: 'Beginner', type: 'cable', defaultRestPeriod: 60 },
                    { id: 'side-plank', title: 'Side Plank', description: 'Core and obliques', imageUrl: '/images/exercises/side-plank.jpg', videoUrl: 'https://youtube.com/watch?v=side-plank', level: 'Beginner', type: 'bodyweight', defaultRestPeriod: 60 }
                ],
            },
            {
                id: 'full-body-day3',
                title: 'Day 3: Full Body C',
                description: 'Incorporates more bodyweight movements',
                imageUrl: '/images/days/full-body-day3.jpg',
                level: 'Beginner',
                exercises: [
                    { id: 'lunge', title: 'Lunge', description: 'Leg and glute exercise', imageUrl: '/images/exercises/lunge.jpg', videoUrl: 'https://youtube.com/watch?v=lunge', level: 'Beginner', type: 'bodyweight', defaultRestPeriod: 60 },
                    { id: 'push-up', title: 'Push-Up', description: 'Upper body exercise', imageUrl: '/images/exercises/push-up.jpg', videoUrl: 'https://youtube.com/watch?v=push-up', level: 'Beginner', type: 'bodyweight', defaultRestPeriod: 60 },
                    { id: 'bent-over-row', title: 'Bent Over Row', description: 'Back strength exercise', imageUrl: '/images/exercises/bent-over-row.jpg', videoUrl: 'https://youtube.com/watch?v=bent-over-row', level: 'Beginner', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'leg-raise', title: 'Leg Raise', description: 'Lower abs exercise', imageUrl: '/images/exercises/leg-raise.jpg', videoUrl: 'https://youtube.com/watch?v=leg-raise', level: 'Beginner', type: 'bodyweight', defaultRestPeriod: 60 },
                    { id: 'bicep-hammer-curl', title: 'Bicep Hammer Curl', description: 'Targets forearms and biceps', imageUrl: '/images/exercises/bicep-hammer-curl.jpg', videoUrl: 'https://youtube.com/watch?v=bicep-hammer-curl', level: 'Beginner', type: 'weight', defaultRestPeriod: 60 },
                    { id: 'mountain-climbers', title: 'Mountain Climbers', description: 'Full body and cardio', imageUrl: '/images/exercises/mountain-climbers.jpg', videoUrl: 'https://youtube.com/watch?v=mountain-climbers', level: 'Beginner', type: 'bodyweight', defaultRestPeriod: 60 }
                ],
            }
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
                    { id: 'bench-press', title: 'Bench Press', description: 'Chest strength exercise', imageUrl: '/images/exercises/bench-press.jpg', videoUrl: 'https://youtube.com/watch?v=bench-press', level: 'Advanced', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'lat-pulldown', title: 'Lat Pulldown', description: 'Back width exercise', imageUrl: '/images/exercises/lat-pulldown.jpg', videoUrl: 'https://youtube.com/watch?v=lat-pulldown', level: 'Advanced', type: 'cable', defaultRestPeriod: 90 },
                    { id: 'shoulder-press', title: 'Shoulder Press', description: 'Builds shoulder strength', imageUrl: '/images/exercises/shoulder-press.jpg', videoUrl: 'https://youtube.com/watch?v=shoulder-press', level: 'Advanced', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'bicep-curl', title: 'Bicep Curl', description: 'Bicep isolation', imageUrl: '/images/exercises/bicep-curl.jpg', videoUrl: 'https://youtube.com/watch?v=bicep-curl', level: 'Advanced', type: 'weight', defaultRestPeriod: 60 },
                    { id: 'tricep-dips', title: 'Tricep Dips', description: 'Tricep exercise', imageUrl: '/images/exercises/tricep-dips.jpg', videoUrl: 'https://youtube.com/watch?v=tricep-dips', level: 'Advanced', type: 'bodyweight', defaultRestPeriod: 60 },
                    { id: 'rear-delt-fly', title: 'Rear Delt Fly', description: 'Rear shoulder exercise', imageUrl: '/images/exercises/rear-delt-fly.jpg', videoUrl: 'https://youtube.com/watch?v=rear-delt-fly', level: 'Advanced', type: 'weight', defaultRestPeriod: 60 }
                ],
            },
            {
                id: 'lower-day',
                title: 'Day 2: Lower Body',
                description: 'Intense leg workout',
                imageUrl: '/images/days/lower-day.jpg',
                level: 'Advanced',
                exercises: [
                    { id: 'squat', title: 'Squat', description: 'Core leg strength exercise', imageUrl: '/images/exercises/squat.jpg', videoUrl: 'https://youtube.com/watch?v=squat', level: 'Advanced', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'deadlift', title: 'Deadlift', description: 'Posterior chain exercise', imageUrl: '/images/exercises/deadlift.jpg', videoUrl: 'https://youtube.com/watch?v=deadlift', level: 'Advanced', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'leg-press', title: 'Leg Press', description: 'Quad strength exercise', imageUrl: '/images/exercises/leg-press.jpg', videoUrl: 'https://youtube.com/watch?v=leg-press', level: 'Advanced', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'calf-raise', title: 'Calf Raise', description: 'Calf development', imageUrl: '/images/exercises/calf-raise.jpg', videoUrl: 'https://youtube.com/watch?v=calf-raise', level: 'Advanced', type: 'weight', defaultRestPeriod: 60 },
                    { id: 'leg-curl', title: 'Leg Curl', description: 'Hamstring isolation', imageUrl: '/images/exercises/leg-curl.jpg', videoUrl: 'https://youtube.com/watch?v=leg-curl', level: 'Advanced', type: 'machine', defaultRestPeriod: 60 },
                    { id: 'bulgarian-split-squat', title: 'Bulgarian Split Squat', description: 'Single-leg exercise', imageUrl: '/images/exercises/bulgarian-split-squat.jpg', videoUrl: 'https://youtube.com/watch?v=bulgarian-split-squat', level: 'Advanced', type: 'weight', defaultRestPeriod: 60 }
                ],
            },
            {
                id: 'upper-lower-combo',
                title: 'Day 3: Upper & Lower Combo',
                description: 'Combines upper and lower body exercises',
                imageUrl: '/images/days/upper-lower-combo.jpg',
                level: 'Advanced',
                exercises: [
                    { id: 'clean-and-press', title: 'Clean and Press', description: 'Full body exercise', imageUrl: '/images/exercises/clean-and-press.jpg', videoUrl: 'https://youtube.com/watch?v=clean-and-press', level: 'Advanced', type: 'weight', defaultRestPeriod: 90 },
                    { id: 'lunges', title: 'Lunges', description: 'Leg and glute exercise', imageUrl: '/images/exercises/lunges.jpg', videoUrl: 'https://youtube.com/watch?v=lunges', level: 'Advanced', type: 'bodyweight', defaultRestPeriod: 60 },
                    { id: 'push-up', title: 'Push-Up', description: 'Upper body endurance', imageUrl: '/images/exercises/push-up.jpg', videoUrl: 'https://youtube.com/watch?v=push-up', level: 'Advanced', type: 'bodyweight', defaultRestPeriod: 60 },
                    { id: 'chin-up', title: 'Chin-Up', description: 'Upper back and biceps', imageUrl: '/images/exercises/chin-up.jpg', videoUrl: 'https://youtube.com/watch?v=chin-up', level: 'Advanced', type: 'bodyweight', defaultRestPeriod: 90 },
                    { id: 'box-jump', title: 'Box Jump', description: 'Plyometric leg exercise', imageUrl: '/images/exercises/box-jump.jpg', videoUrl: 'https://youtube.com/watch?v=box-jump', level: 'Advanced', type: 'bodyweight', defaultRestPeriod: 60 },
                    { id: 'kettlebell-swing', title: 'Kettlebell Swing', description: 'Full body cardio and strength', imageUrl: '/images/exercises/kettlebell-swing.jpg', videoUrl: 'https://youtube.com/watch?v=kettlebell-swing', level: 'Advanced', type: 'weight', defaultRestPeriod: 60 }
                ],
            }
        ],
    }
];

export const fetchWorkoutPlans = (): Promise<WorkoutPlan[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(WORKOUT_PLANS);
        }, 1000); // Simulate network delay
    });
};

export const fetchWorkoutPlanById = (planId: string): Promise<WorkoutPlan | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const plan = WORKOUT_PLANS.find(p => p.id === planId);
            resolve(plan);
        }, 1000);
    });
};
