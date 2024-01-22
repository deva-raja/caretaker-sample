'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { Title } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { addWardData, createEvent } from '@/service/page';
import toast, { Toaster } from 'react-hot-toast';
import { CreateEventResponse } from '@/types';
import axios from 'axios';
import {
  EventHKSFormInput,
  eventHKSFormSchema,
} from '@/utils/validators/create-event-hks.schema';
import { signOut } from 'next-auth/react';
import { WardDataFormInput, wardDataFormSchema } from '@/utils/validators/create-ward-data.schema';

export default function CreateUser() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<WardDataFormInput> = async (data) => {

    const formattedData = {
      date: data.date,
      collection_point_id: parseInt(data.collection_point_id),
      ward_no: data.ward_no,
      hks_team_name: data.hks_team_name,
      shop_visited: parseInt(data.shop_visited),
      shop_paid: parseInt(data.shop_paid),
      shop_vacant: parseInt(data.shop_vacant),
      house_visited: parseInt(data.house_visited),
      house_paid: parseInt(data.house_paid),
      house_denied: parseInt(data.house_denied),
      house_vacant: parseInt(data.house_vacant),
      house_not_intrested: parseInt(data.house_not_intrested),
      house_w_no_money: parseInt(data.house_w_no_money),
      collection_amt: parseInt(data.collection_amt),
      hks_incentive: parseInt(data.hks_incentive),
    };

    setLoading(true);

    try {
      const response = await addWardData(formattedData);
      const resultData = response.data as CreateEventResponse;

      console.log('API Response:', resultData);

      if (resultData.status == true) {
        setReset({
          name: '',
          expense: '',
          date: '',
        });
        closeModal();
        toast.success('Event created successfully', {
          position: 'top-right',
        });
      }
    } catch (err: any) {
      console.log('Error message ', err.response);
      if (err.response && err.response?.data?.statusCode === 401) {
        signOut({
          callbackUrl: 'http://localhost:3000',
        });
      } else if (err.response.data) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {' '}
      <Toaster position="top-right" />
      <Form<WardDataFormInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={wardDataFormSchema}
        className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
      >
        {({ register, control, watch, formState: { errors } }) => {
          return (
            <>
              <div className="col-span-full flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                  Add a new Event
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>
              <Input
                label="Date"
                type="date"
                className="col-span-full"
                {...register('date')}
                error={errors.date?.message}
              />

              <Input
                label="Collection Point ID"
                placeholder="Enter collection point id"
                // className="col-span-full"
                {...register('collection_point_id')}
                error={errors.collection_point_id?.message}
              />
              <Input
                label="Ward Number"
                placeholder="Enter ward number"
                // className="col-span-full"
                {...register('ward_no')}
                error={errors.ward_no?.message}
              />

              <Input
                label="HKS Team Name"
                placeholder="Enter HKS team name"
                // className="col-span-full"
                {...register('hks_team_name')}
                error={errors.hks_team_name?.message}
              />
              <Input
                label="Shop Visited"
                placeholder="Enter no of visited shops"
                // className="col-span-full"
                {...register('shop_visited')}
                error={errors.shop_visited?.message}
              />
              <Input
                label="Shop Paid"
                placeholder="Enter no of paid shops"
                // className="col-span-full"
                {...register('shop_paid')}
                error={errors.shop_paid?.message}
              />
              <Input
                label="No of vacant shops"
                placeholder="Enter no of vacant shops"
                // className="col-span-full"
                {...register('shop_vacant')}
                error={errors.shop_vacant?.message}
              />
              <Input
                label="House Visited"
                placeholder="Enter no of visited houses"
                // className="col-span-full"
                {...register('house_visited')}
                error={errors.house_visited?.message}
              />
              <Input
                label="House Paid"
                placeholder="Enter no of paid houses"
                // className="col-span-full"
                {...register('house_paid')}
                error={errors.house_paid?.message}
              />
              <Input
                label="Houses Denied"
                placeholder="Houses denied"
                // className="col-span-full"
                {...register('house_denied')}
                error={errors.house_denied?.message}
              />
              <Input
                label="House Vacant"
                placeholder="Enter no of vacant houses"
                // className="col-span-full"
                {...register('house_vacant')}
                error={errors.house_vacant?.message}
              />
              <Input
                label="Houses Not Interested"
                placeholder="Houses Not Interested"
                // className="col-span-full"
                {...register('house_not_intrested')}
                error={errors.house_not_intrested?.message}
              />
              <Input
                label="House NO MONEY ???"
                // placeholder="Enter no of vacant houses"
                // className="col-span-full"
                {...register('house_w_no_money')}
                error={errors.house_w_no_money?.message}
              />
              <Input
                label="Collection Amount"
                placeholder="Enter collection amount"
                // className="col-span-full"
                {...register('collection_amt')}
                error={errors.collection_amt?.message}
              />
              <Input
                label="HKS Incentive"
                placeholder="Enter HKS incentive"
                // className="col-span-full"
                {...register('hks_incentive')}
                error={errors.hks_incentive?.message}
              />

              {errorMessage && (
                <div className="col-span-full text-sm font-semibold text-red-500">
                  {errorMessage}
                </div>
              )}

              <div className="col-span-full flex items-center justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  className="w-full @xl:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full @xl:w-auto"
                >
                  Create Event
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
