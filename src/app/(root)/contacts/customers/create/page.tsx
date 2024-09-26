"use client";

import React from "react";

import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import {
  CUSTOMER_PREFERRED_CONTACT,
  CUSTOMER_STATUS,
} from "~/_constants/CUSTOMER";
import { useCreateCustomer } from "~/app/(root)/contacts/customers/hooks/use-customers";
import DatePicker from "~/components/date-picker/DatePicker";
import Spinner from "~/components/loader/Spinner";
import TimePicker from "~/components/time-picker/TimePicker";

import { Button } from "@/mijn-ui/components/Button";
import { Input } from "@/mijn-ui/components/Input";

import SelectionMenu from "./SelectionMenu";

/* -------------------------------------------------------------------------- */

// This is just an example of a form that can be used to create a new customer contact.
// TODO-1: This form should be validated before submitting the data to the server.
// TODO-2: The form should also be able to handle errors and display them to the user.

const CreateUser = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const router = useRouter();

  const { mutate: addCustomer, isPending } = useCreateCustomer({
    onSuccess: () => {
      toast.success("Customer contact created successfully!", {
        action: {
          label: "Got it",
          onClick: () => {},
        },
      });
      router.push("/contacts/customers");
    },
    onError: () => {
      toast.error(
        "Failed to create customer contact!, please try again later.",
        {
          action: {
            label: "Got it",
            onClick: () => {},
          },
        },
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-0 flex h-full w-full flex-col gap-10 rounded-2xl bg-surface p-5 md:mt-3 lg:mt-0"
    >
      {/* Customer Information and Company Details */}
      {ContactFormItems.map((item) => (
        <FieldSetInputGroup
          key={item.group}
          groupName={item.group}
          inputFields={item.inputFields}
        />
      ))}

      {/* Additional Details */}
      <fieldset className="flex w-full flex-col gap-4">
        <LegendWithBorder title="Additional Details" />

        <InputGroup
          label="Contact ID"
          id="contact-id"
          name="contact-id"
          placeholder="Contact ID..."
          type="text"
        />

        <div className="flex w-full flex-wrap gap-2">
          <div className="min-w-42 flex flex-col gap-2">
            <label htmlFor="" className="text-sm">
              Select Date
            </label>
            <DatePicker date={date} onDatePick={setDate} />
          </div>

          <div className="min-w-42 flex flex-col gap-2">
            <label className="text-sm">Select Time</label>
            <TimePicker date={date} onTimePick={setDate} />
          </div>
        </div>

        <div className="flex h-40 flex-col gap-2">
          <label htmlFor="additional-note">Additional Note</label>
          <Input
            required
            placeholder="Additional Note..."
            renderAs="textarea"
            name="additional-note"
            id="additional-note"
            className="h-full flex-1 items-start [&>textarea]:h-full [&>textarea]:resize-none"
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="">
              Preferred Contact Type
            </label>

            <SelectionMenu
              defaultSelectedIndex={0}
              defaultSelectedLabel="Email"
              selectionTitle="Preferred Contact"
              selectionItems={CUSTOMER_PREFERRED_CONTACT}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="">
              Customer Status
            </label>

            <SelectionMenu
              defaultSelectedIndex={0}
              defaultSelectedLabel="Active"
              selectionTitle="Status"
              selectionItems={CUSTOMER_STATUS}
            />
          </div>
        </div>
      </fieldset>

      <div className="flex w-full items-center justify-end">
        <Button
          disabled={isPending}
          type="submit"
          className="h-default w-20 gap-2 text-default text-primary-text"
        >
          Save
          {isPending && <Spinner className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  );
};

/* -------------------------------------------------------------------------- */

type InputField = {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  name: string;
};

const FieldSetInputGroup = ({ groupName, inputFields }: InputGroupProps) => {
  return (
    <fieldset className="flex flex-col gap-4">
      <LegendWithBorder title={groupName} />

      <div className="flex flex-wrap items-center gap-2">
        {inputFields.map((inputField) => (
          <InputGroup key={inputField.label} {...inputField} />
        ))}
      </div>
    </fieldset>
  );
};

/* -------------------------------------------------------------------------- */

type InputGroupProps = {
  groupName: string;
  inputFields: InputField[];
};

const InputGroup = (props: InputField) => {
  return (
    <div className="flex min-w-48 flex-1 flex-col justify-center gap-2">
      <label className="text-sm" htmlFor={props.id}>
        {props.label}
      </label>
      <Input
        required
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */

type LegendWithBorderProps = {
  title: string;
};

const LegendWithBorder = ({ title }: LegendWithBorderProps) => {
  return (
    <div className="flex w-full items-center gap-2">
      <legend className="relative min-w-fit text-primary">{title}</legend>
      <div className="h-px w-full bg-main-border" />
    </div>
  );
};

/* -------------------------------------------------------------------------- */

const ContactFormItems = [
  {
    group: "Customer Information",
    inputFields: [
      {
        label: "First Name",
        type: "text",
        placeholder: "First name...",
        id: "first-name",
        name: "first-name",
      },
      {
        label: "Last Name",
        type: "text",
        placeholder: "Last name...",
        id: "last-name",
        name: "last-name",
      },
      {
        label: "Phone Number",
        type: "tel",
        placeholder: "Phone number...",
        id: "phone-number",
        name: "phone-number",
      },
      {
        label: "Email",
        type: "email",
        placeholder: "Email address...",
        id: "email",
        name: "email",
      },
    ],
  },

  {
    group: "Company Details",
    inputFields: [
      {
        label: "Company Name",
        type: "text",
        placeholder: "Company name...",
        id: "company",
        name: "company",
      },
      {
        label: "Location",
        type: "text",
        placeholder: "Location...",
        id: "location",
        name: "location",
      },
    ],
  },
];

export default CreateUser;