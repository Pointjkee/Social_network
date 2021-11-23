import {useFormik} from "formik";
import React from "react";

type propsType = {
    addPost: (text: string) => void
}

export const MessageForm = (props: propsType) => {
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true)
            setTimeout(() => {
                props.addPost(values.message)
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
                    placeholder="Поделиться новостью"
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