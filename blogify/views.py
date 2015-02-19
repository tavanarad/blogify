from django.views import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie

class IndexView(TemplateView):

    template_name='siad/index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class HomeView(TemplateView):
    template_name='siad/home.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['menus'] = Menu.objects.filter(parent=None)
        
        return context
