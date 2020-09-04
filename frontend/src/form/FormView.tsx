import { Formik, FormikConfig, FormikProps } from 'formik';
import * as React from 'react';
import { Prompt } from 'react-router';
import IziviContent from '../layout/IziviContent';
import { HandleFormikSubmit } from '../types';
import { FormikSubmitDetector } from './FormikSubmitDetector';

export interface FormViewProps<T> {
  card?: boolean;
  onSubmit: (values: T, formikProps?: FormikProps<T>) => Promise<void>;
  loading?: boolean;
  title?: string;
  submitted?: boolean;
}

interface Props<T> extends FormViewProps<T> {
  render: (props: FormikProps<T>) => React.ReactNode;
  validationSchema: any;
}

export class FormView<Values, ExtraProps = {}> extends React.Component<FormikConfig<Values> & ExtraProps & Props<Values>> {
  render() {
    const { loading, title, children, ...rest } = this.props;
    return (
      <IziviContent card={this.props.card} loading={loading} title={title}>
        {!this.props.loading &&
          <>
            <Formik
              {...rest}
              onSubmit={this.handleSubmit}
              render={(formikProps: FormikProps<Values>) => (
                <FormikSubmitDetector {...formikProps}>
                  <Prompt when={!this.props.submitted && formikProps.dirty} message={() => 'Änderungen verwerfen?'}/>
                  {this.props.render(formikProps)}
                </FormikSubmitDetector>
              )}
            />
            {children}
          </>
        }

      </IziviContent>
    );
  }

  private handleSubmit: HandleFormikSubmit<Values> = async (values, formikBag) => {
    try {
      await this.props.onSubmit(this.props.validationSchema.cast(values), formikBag);
    } finally {
      formikBag.setSubmitting(false);
    }
  }
}
