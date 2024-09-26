import { protectAccountOwner } from "../../config/validateOwner";
import { PurchasesModel } from "../../data/postgres/models/Purchases.model";
import { CatchError } from "../../domain";
import { CreatePurchasesDTO } from "../../domain/dtos/purchases/create.Purchases";
import { AuthService } from "./auth.services";
import { VideoGamesServices } from "./videoGames.Services";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class PurchaseServices {
  constructor(
    private readonly authService: AuthService,
    private readonly videoServices: VideoGamesServices
  ) {}

  async createPurchases(purchasesData: CreatePurchasesDTO) {
    const videogamePromise = this.videoServices.findOneVideogamesById(
      purchasesData.videogameId
    );

    const userPromise = this.authService.getProfile(purchasesData.userId);

    const [videogame, user] = await Promise.all([
      videogamePromise,
      userPromise,
    ]);

    const purchase = new PurchasesModel();

    purchase.user = user;

    purchase.videogame = videogame;

    try {
      return await purchase.save();
    } catch (error) {
      throw CatchError.internalServer("Something went very wrong!");
    }
  }

  async findAllPurchases() {
    try {
      return await PurchasesModel.find({
        where: {
          status: Status.ACTIVE,
        },
      });
    } catch (error) {
      throw CatchError.internalServer("Something went very wrong!");
    }
  }
  async findOnePurchases(id: number) {
    const purchase = await PurchasesModel.findOne({
      where: {
        id,
        status: Status.ACTIVE,
      },
      relations: ["user", "videogame"],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          role: true,
        },
        videogame: {
          id: true,
          title: true,
          description: true,
          price: true,
        },
      },
    });
    if (!purchase) throw CatchError.notFound("Purchase not found");
    return purchase;
  }

  async deletePurchases(id: number, userSessionId: number) {
    const purchase = await this.findOnePurchases(id);
    // console.log(purchase);
    const isOwner = protectAccountOwner(purchase.user.id, userSessionId);
    if (!isOwner)
      throw CatchError.unAuthorized("You are not owner of this purchase");
    purchase.status = Status.INACTIVE;
    try {
      return await purchase.save();
    } catch (error) {
      throw CatchError.internalServer("Something went very wrong!");
    }
  }
}
