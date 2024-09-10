import { Snackbar } from "@mui/joy"
export default {
    title: "Components/Toast",
    component: Snackbar,
    argTypes: {
        variant: {
            options: ['primary', 'outlined', 'solid', 'soft'],
            control: { type: 'radio' },
        },
        open: {
            options: [true, false],
            control: { type: 'radio' },
        },
        horizontal:{
            options:['left','center','right'],
            control: { type: 'select' },
        },
        vertical:{
            options:['bottom','top'],
            control: { type: 'select' },
        },
        color:{
            options:['primary','success','warning','danger','neutral'],
            control: { type: 'select' },
        },
        size:{
            options:['sm','md','lg'],
            control: { type: 'radio'}
        }
    },
    tags: ['autodocs'],
};


export const Template = (args: any) => {
    const {horizontal,vertical} = args;
    return <Snackbar {...args} anchorOrigin={{vertical,horizontal}}>A Message of Success</Snackbar>
}
Template.args = {
    open: true,
    variant: 'soft',
    horizontal:'right',
    vertical:'top',
    color:'success',
    size:'md',
};
