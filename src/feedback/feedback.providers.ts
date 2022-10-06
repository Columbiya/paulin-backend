import { Feedback } from "src/models/feedback.entity";

export const feedbackProviders = [
    {
        provide: 'FEEDBACK_REPOSITORY',
        useValue: Feedback
    }
]