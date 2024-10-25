import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { EditIcon } from "../../../assets/icons/edit";
import { useAuth } from "../../../hooks/useAuth";
import { AppRoles } from "../../../helper/app-roles";

type Props = {
  title: string;
  description: string;
  status: boolean;
  onClick: () => void;
  onEdit: () => void;
};

export const CampaignCard = ({
  title,
  description,
  onClick,
  onEdit,
  status,
}: Props) => {
  const { user } = useAuth();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card className="py-2">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <div className="flex flex-row justify-between w-full">
            <Chip color={status ? "success" : "danger"}>
              {status ? "Activa" : "Cerrada"}
            </Chip>

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
          <h4 className="font-bold text-large">{title}</h4>
          <small className="text-default-500">{description}</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://pbc712.org/wp-content/uploads/2020/08/vote-for-blog.jpg"
            width="100%"
          />
        </CardBody>
      </Card>
    </div>
  );
};
