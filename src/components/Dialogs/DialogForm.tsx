import {Formik} from "formik";
import React from "react";
import * as yup from 'yup'

type propsType = {
    sendMessage: (message: string) => void
}
const validationSchema = yup.object().shape({
    message: yup.string().required('Напишите что-нибудь').max(50, 'Слишком много!')
})

export const DialogForm = (props: propsType) => (
    <Formik
        initialValues={{message: ''}}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            setTimeout(() => {
                props.sendMessage(values.message)
                resetForm()
                setSubmitting(false)
            }, 500)
        }}
    >
        {props => (
            <form onSubmit={props.handleSubmit}>
                <div>
            <textarea
                id="message"
                placeholder="Поделиться новостью"
                {...props.getFieldProps("message")}
            />
                    {props.errors.message && props.touched.message ? (
                        <div style={{color: 'red'}}>{props.errors.message}</div>
                    ) : null}
                </div>
                <button type="submit"
                        disabled={props.isSubmitting || !!props.errors.message}
                >Send
                </button>
            </form>
        )}
    </Formik>
)