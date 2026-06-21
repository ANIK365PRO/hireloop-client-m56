import { requireRole } from '@/lib/core/session';

const RecruiterLayout = async ({ children }) => {
    await requireRole('recruiter')  // check user or not
    return children;
};

export default RecruiterLayout;