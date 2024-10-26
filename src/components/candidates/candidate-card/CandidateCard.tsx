import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";

import { EditIcon } from "../../../assets/icons/edit";
import { AppRoles } from "../../../helper/app-roles";
import { useAuth } from "../../../hooks/useAuth";

type Props = {
  id: string;
  name: string;
  description: string;
  votes: number;
  onClick?: () => void;
  onVote?: () => void;
};

export const CandidateCard = ({
  name,
  description,
  onClick,
  onVote,
  votes,
}: Props) => {
  const { user } = useAuth();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card className="py-2">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex flex-row justify-between w-full">
          <h4 className="font-bold text-large">{name}</h4>
          {user && user.rol === AppRoles.Admin && (
            <div>
              <Button
                className="w-8 h-8"
                isIconOnly
                color="primary"
                variant="faded"
                aria-label="Take a photo"
                onClick={clickHandler}
              >
                <EditIcon />
              </Button>
            </div>
          )}
        </div>
        <small className="text-default-500">{description}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`https://randomuser.me/api/portraits/men/${Math.round(
            Math.random() * 50
          )}.jpg`}
          width="100%"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 items-center">
          <Chip
            color="warning"
            variant="bordered"
            className="max-w-full text-center"
          >
            Votos: {votes}
          </Chip>
          <Button color="primary" type="button" onClick={onVote}>
            Votar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
