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

    await Promise.all([videogamePromise, userPromise]);

    const purchase = new PurchasesModel();

    purchase.user_id = purchasesData.userId;

    purchase.videogame_id = purchasesData.videogameId;

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
    });
    if (!purchase) throw CatchError.notFound("Purchase not found");
    return purchase;
  }

  async deletePurchases(id: number, userSessionId: number) {
    const purchase = await this.findOnePurchases(id);

    const isOwner = protectAccountOwner(purchase.user_id, userSessionId);
    if (!isOwner)
      throw CatchError.unAuthorized("You are not owner of this purchase");

    purchase.status = Status.INACTIVE;
    try {
      await purchase.save();
    } catch (error) {
      throw CatchError.internalServer("Something went very wrong!");
    }
  }
}
