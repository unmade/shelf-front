import type React from 'react';
import { useReducer } from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { isEmail, isStrongPassword } from 'validator';

import { TERMS_AND_CONDITION_URL, PRIVACY_POLICY_URL } from 'constants';

import Button from 'components/ui/Button';
import Checkbox, { CheckboxField } from 'components/ui/Checkbox';
import Field, { ErrorMessage, Label } from 'components/ui/Field';
import Input from 'components/ui/Input';
import { TextLink } from 'components/ui/Text';

const nameRegEx = /^[\p{L} .'-]+$/u;

const strongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

export interface IOnSubmitArg {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

type StateField = 'name' | 'email' | 'password' | 'confirmPassword' | 'agreeToTermsAndConditions';

interface State {
  fields: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTermsAndConditions: boolean;
  };
  errors: {
    name: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    agreeToTermsAndConditions: string | null;
  };
}

const initialState = {
  fields: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTermsAndConditions: false,
  },
  errors: {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    agreeToTermsAndConditions: null,
  },
};

interface InputChangedAction {
  type: 'inputChanged';
  payload:
    | {
        name: 'name' | 'email' | 'password' | 'confirmPassword';
        value: string;
      }
    | {
        name: 'agreeToTermsAndConditions';
        value: boolean;
      };
}

interface ErrorSetAction {
  type: 'errorSet';
  payload: { name: StateField; value: string };
}

interface ErrorsSetAction {
  type: 'errorsSet';
  payload: {
    errors: {
      name: StateField;
      value: string;
    }[];
  };
}

function reducer(state: State, action: InputChangedAction | ErrorSetAction | ErrorsSetAction) {
  switch (action.type) {
    case 'inputChanged': {
      const { name, value } = action.payload;
      return {
        ...state,
        fields: {
          ...state.fields,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: null,
        },
      };
    }
    case 'errorSet': {
      const { name, value } = action.payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: value,
        },
      };
    }
    case 'errorsSet': {
      const { errors } = action.payload;
      const nextErrorState = { ...state.errors };
      errors.forEach(({ name, value }) => {
        nextErrorState[name] = value;
      });
      return {
        ...state,
        errors: nextErrorState,
      };
    }
    default:
      return state;
  }
}

interface Props {
  loading: boolean;
  onSubmit: (arg: IOnSubmitArg) => void;
}

function SignUpForm({ loading, onSubmit }: Props) {
  const { t } = useTranslation(['translation', 'signup', 'forms']);

  const [{ fields, errors }, dispatch] = useReducer(reducer, initialState);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({
      type: 'inputChanged',
      payload: { name: name as 'name' | 'email' | 'password' | 'confirmPassword', value },
    });
  };

  const onCheckboxChange = (checked: boolean) => {
    dispatch({
      type: 'inputChanged',
      payload: { name: 'agreeToTermsAndConditions', value: checked },
    });
  };

  const isValid = () => {
    // check all fields are set
    const emptyFields: { name: StateField; value: string }[] = [];
    Object.entries(fields).forEach(([field, value]) => {
      if (value == null || value === '') {
        emptyFields.push({ name: field as StateField, value: t('This field is required') });
      }
    });

    // check agreed to terms and conditions
    if (!fields.agreeToTermsAndConditions) {
      emptyFields.push({
        name: 'agreeToTermsAndConditions',
        value: t('signup:form.errors.agreeToTermsAndConditionsUnchecked', {
          defaultValue: 'You must accept Shelf Terms and Privacy Policy to register an account',
        }),
      });
    }

    if (emptyFields.length) {
      dispatch({ type: 'errorsSet', payload: { errors: emptyFields } });
      return false;
    }

    const name = fields.name.trim();
    if (!nameRegEx.test(name)) {
      dispatch({
        type: 'errorSet',
        payload: {
          name: 'name',
          value: t('signup:form.errors.invalidName', {
            defaultValue: 'Name can only contain letters, spaces, hyphens, and apostrophes',
          }),
        },
      });
      return false;
    }

    if (name.length < 2) {
      dispatch({
        type: 'errorSet',
        payload: {
          name: 'name',
          value: t('signup:form.errors.nameTooShort', {
            defaultValue: 'Name must be at least 2 characters long',
          }),
        },
      });
      return false;
    }

    if (name.length > 100) {
      dispatch({
        type: 'errorSet',
        payload: {
          name: 'name',
          value: t('signup:form.errors.nameTooLong', {
            defaultValue: 'Name must be 2 to 100 character long',
          }),
        },
      });
      return false;
    }

    const email = fields.email.trim();
    if (!isEmail(email)) {
      dispatch({
        type: 'errorSet',
        payload: {
          name: 'email',
          value: t('signup:form.errors.invalidEmail', { defaultValue: 'Invalid email address' }),
        },
      });
      return false;
    }

    const { password } = fields;
    if (password.length > 63) {
      dispatch({
        type: 'errorSet',
        payload: {
          name: 'password',
          value: t('signup:form.errors.passwordTooLong', {
            minLength: 8,
            maxLength: 63,
            defaultValue: 'Password should be {{minLength}} to {{maxLength}} character long',
          }),
        },
      });
      return false;
    }

    // check password is strong enough
    if (!isStrongPassword(password, strongPasswordOptions)) {
      dispatch({
        type: 'errorSet',
        payload: {
          name: 'password',
          value: t('signup:form.errors.weakPassword', {
            defaultValue:
              'Password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number',
          }),
        },
      });
      return false;
    }

    // check passwords match
    const { confirmPassword } = fields;
    if (confirmPassword !== password) {
      dispatch({
        type: 'errorsSet',
        payload: {
          errors: [
            {
              name: 'confirmPassword',
              value: t('signup:form.errors.passwordsShouldMatch', {
                defaultValue: 'Please make sure your passwords match',
              }),
            },
          ],
        },
      });
      return false;
    }

    return true;
  };

  const submit = () => {
    if (isValid()) {
      const { email, name, password, confirmPassword } = fields;
      onSubmit({
        email: email.trim(),
        name,
        password,
        confirmPassword,
      });
    }
  };

  return (
    <form
      className="mt-5 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <Field>
        <Label>{t('signup:form.inputs.name.label', { defaultValue: 'Full name' })}</Label>
        <Input
          id="name"
          name="name"
          placeholder={t('signup:form.inputs.name.placeholder', { defaultValue: 'Name' })}
          onChange={onInputChange}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </Field>
      <Field>
        <Label>{t('signup:form.inputs.email.label', { defaultValue: 'Email' })}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t('signup:form.inputs.email.placeholder', { defaultValue: 'Email' })}
          onChange={onInputChange}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </Field>
      <Field>
        <Label>{t('signup:form.inputs.password.label', { defaultValue: 'Password' })}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          onChange={onInputChange}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </Field>
      <Field>
        <Label>
          {t('signup:form.inputs.confirmPassword.label', { defaultValue: 'Confirm Password' })}
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="********"
          onChange={onInputChange}
        />
        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
      </Field>
      <CheckboxField>
        <Checkbox defaultChecked={false} onChange={onCheckboxChange} />
        <Label>
          <Trans as={Text} i18nKey="signup:form.iHaveReadAndAgreeToTermsAndConditions" t={t}>
            I agree to the {}
            <TextLink href={TERMS_AND_CONDITION_URL}>Shelf Terms</TextLink> and{' '}
            <TextLink href={PRIVACY_POLICY_URL}>Privacy Policy</TextLink>
          </Trans>
        </Label>
        {errors.agreeToTermsAndConditions && (
          <ErrorMessage>{errors.agreeToTermsAndConditions}</ErrorMessage>
        )}
      </CheckboxField>
      <div className="w-full pt-2">
        <Button
          type="submit"
          className="w-full"
          title={t('signup:form.button.title', { defaultValue: 'Create an account' })}
          variant="primary"
          onClick={submit}
          disabled={loading}
        >
          {t('signup:form.button.title', { defaultValue: 'Create an account' })}
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm;
