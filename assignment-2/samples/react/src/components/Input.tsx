import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import React, { FC, HTMLInputTypeAttribute } from "react";

type Props = {
    name: string;
    label: string;
    type: HTMLInputTypeAttribute;
    id: string;
    placeholder: string;
    validation: RegisterOptions<FieldValues, string> | undefined;
};

export const Input: FC<Props> = ({
    name,
    label,
    type,
    id,
    placeholder,
    validation,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const inputErrors: { error?: { message: string; type: string } } =
        Object.keys(errors)
            .filter((key) => key.includes(name))
            .reduce((cur, key) => {
                return Object.assign(cur, { error: errors[key] });
            }, {});

    return (
        <div>
            <label htmlFor={id} style={{ fontSize: 12, fontWeight: "bold" }}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(name, validation)}
                style={{
                    width: 230,
                    fontSize: 12,
                    marginLeft: 10,
                    padding: 5,
                    borderRadius: 5,
                    border: "solid",
                    borderColor: inputErrors.error !== undefined ? "#FF0000" : "#E2E2E2",
                }}
            />
            {inputErrors.error !== undefined &&
                inputErrors.error.type !== "required" && (
                    <p role="alert" style={{ color: "red", fontSize: 10 }}>
                        {inputErrors.error?.message}
                    </p>
                )}
        </div>
    );
};
