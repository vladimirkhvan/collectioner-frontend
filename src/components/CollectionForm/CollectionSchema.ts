import * as Yup from 'yup';

export const CollectionSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    description: Yup.string().max(400, 'Too Long!').required('Required')
});
