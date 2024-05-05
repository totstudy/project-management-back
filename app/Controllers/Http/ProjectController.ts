import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Project from "../../Models/Project";
// import User from "../../Models/User";

export default class ProjectController {
  public async get({ auth, response }: HttpContextContract) {
    const user = await auth.user;
    if (!user) {
      return response.status(401).send({ error: 'User not authenticated' });
    }
    // console.log("user:",user)
    await user.load("projects");
    return response.ok({ projects: user.projects });
  }

//   public async create({ auth, request, response }: HttpContextContract) {
//     console.log("request.all()",request.all())
//     const { name } = request.all();
//     const user: User = await auth.user;
//     const projects = await user.related("projects").create({
//       name: name,
//     });

//     return response.ok({ projects: projects });
//   }

  public async create({ auth, request, response }: HttpContextContract) {
    try {
      // フォームから送信されたデータを取得
      const { name, description, skills, customer, assignees, status } = request.all();
  
      console.log("request.all()",request.all())
      // 認証されたユーザーを取得
      const user = await auth.user;
      if (!user) {
        return response.status(401).send({ error: 'User not authenticated' });
      }
      // projectモデルのcreateメソッドを使用して新しい案件を作成
      const projects = await user.related("projects").create({
        name: name,
        description: description,
        skills: skills,
        customer: customer,
        assignees: assignees,
        status: status,
      });
  
      // 正常なレスポンスを返す
      return response.ok({ projects: projects });
    } catch (error) {
      // エラーが発生した場合はエラーレスポンスを返す
      console.error("An error occurred while creating user case:", error);
      return response.status(500).send({ error: "An error occurred while creating user case" });
    }
  }
  
  public async detail({ params, response }: HttpContextContract){
    console.log("detail:",params.id)
    const id  = params.id;
    const projects = await Project.findOrFail(id);
    // await projects.merge(args).save();
    return response.ok({ projects });
  }

//   public async update({ request, response }: HttpContextContract) {
//     console.log("update:",request.all())
//     const { id, ...args } = request.all();
//     const projects = await Project.findOrFail(id);
//     await projects.merge(args).save();
//     return response.ok({ projects: projects });
//   }

public async update({ params, request, response }: HttpContextContract) {
    try {
        const { id } = params;
        const data = request.only(['status']); // リクエストからステータスを取得
        console.log("data:",data)
        const project = await Project.findOrFail(id); // IDに基づいてユーザーケースを取得
        project.merge(data); // リクエストデータでユーザーケースをマージ
        await project.save(); // 変更を保存
        return response.ok({ user_case: Project }); // 更新されたユーザーケースを返す
    } catch (error) {
        console.error('データの更新中にエラーが発生しました:', error);
        return response.status(500).send({ message: 'データの更新中にエラーが発生しました' }); // エラーレスポンスを返す
    }
}




  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.all();
    const projects = await Project.findOrFail(id);
    await projects.delete();
    return response.status(200);
  }
}
