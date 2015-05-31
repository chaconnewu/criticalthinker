var App = blocks.Application();

var Product = App.Model({
  name: App.Property(),

  editing: blocks.observable(false),

  toggleEdit: function () {
    this.editing(!this.editing());
  },

  remove: function () {
    this.destroy(true);
  }
});

var Products = App.Collection(Product);

App.View('Products', {
  newProduct: Product(),

  products: Products([{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }]),

  keydown: function (e) {
    if (e.which == 13) {
      this.products.add(this.newProduct);
      this.newProduct.reset();
    }
  }
});