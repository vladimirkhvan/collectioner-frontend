import * as Yup from 'yup';

export const ItemSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').required('Required'),
});
