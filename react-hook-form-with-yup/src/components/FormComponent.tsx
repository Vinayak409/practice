import React from "react";
import * as _ from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues, GenderOption } from "../interfaces";
import { GENDER_OPTIONS } from "../constants";

export const FormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>User Registration Form</h3>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && (
          <span className="field_level_error">This field is required</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && (
          <span className="field_level_error">This field is required</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select className="form-control">
          <option value="">Select Gender</option>
          {_.map(GENDER_OPTIONS, (option: GenderOption, index: number) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        {errors.gender && (
          <span className="field_level_error">This field is required</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="field_level_error">This field is required</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          className="form-control"
          {...register("phoneNumber", { required: true })}
        />
        {errors.phoneNumber && (
          <span className="field_level_error">This field is required</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="field_level_error">This field is required</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <span className="field_level_error">This field is required</span>
        )}
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default FormComponent;
