import {useFormik} from "formik";
import React from "react";

type propsType = {
    sendMessage: (message: string) => void
}

export const DialogForm = (props: propsType) => {
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true)
            setTimeout(() => {
                props.sendMessage(values.message)
                formik.resetForm()
                setSubmitting(false)
            }, 500)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea
                    id="message"
                    placeholder="Message"
                    {...formik.getFieldProps("message")}
                />
            </div>
            <button type="submit"
                    disabled={formik.isSubmitting}
            >Send
            </button>
        </form>
    );
}